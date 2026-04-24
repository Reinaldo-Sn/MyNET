from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("notifications", "0004_alter_notification_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="notification",
            name="type",
            field=models.CharField(
                choices=[
                    ("follow", "Follow"),
                    ("like", "Like"),
                    ("comment_reply", "Comment Reply"),
                    ("poke", "Poke"),
                    ("mention", "Mention"),
                ],
                max_length=20,
            ),
        ),
    ]
