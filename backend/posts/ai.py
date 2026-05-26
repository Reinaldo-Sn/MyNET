import os
import requests

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
GROQ_API_KEY = os.getenv('GROQ_API_KEY')


def moderate_content(text):
    """Returns (is_flagged, reason). Falls back to (False, None) on any error."""
    if not OPENAI_API_KEY or not text.strip():
        return False, None
    try:
        response = requests.post(
            'https://api.openai.com/v1/moderations',
            headers={
                'Authorization': f'Bearer {OPENAI_API_KEY}',
                'Content-Type': 'application/json',
            },
            json={'input': text, 'model': 'omni-moderation-latest'},
            timeout=10,
        )
        result = response.json()
        if result.get('results') and result['results'][0]['flagged']:
            categories = result['results'][0]['categories']
            flagged = [cat for cat, val in categories.items() if val]
            return True, ', '.join(flagged)
    except Exception:
        pass
    return False, None


def summarize_post(text):
    """Returns summary string. Raises on failure."""
    response = requests.post(
        'https://api.groq.com/openai/v1/chat/completions',
        headers={
            'Authorization': f'Bearer {GROQ_API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'model': 'llama-3.1-8b-instant',
            'messages': [
                {
                    'role': 'system',
                    'content': (
                        'Resuma o seguinte post de rede social em 1-2 frases curtas em português. '
                        'Responda apenas com o resumo, sem introduções.'
                    ),
                },
                {'role': 'user', 'content': text},
            ],
            'max_tokens': 100,
            'temperature': 0.3,
        },
        timeout=15,
    )
    result = response.json()
    return result['choices'][0]['message']['content'].strip()
