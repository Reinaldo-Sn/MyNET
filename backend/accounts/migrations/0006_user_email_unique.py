from django.db import migrations, models


def empty_email_to_null(apps, schema_editor):
    User = apps.get_model("accounts", "User")
    User.objects.filter(email="").update(email=None)


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0005_user_pinned_post"),
    ]

    operations = [
        # 1 — remove NOT NULL para poder converter strings vazias em NULL
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(blank=True, null=True, default=None),
        ),
        # 2 — converter strings vazias em NULL
        migrations.RunPython(empty_email_to_null, migrations.RunPython.noop),
        # 3 — adicionar unique constraint
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(blank=True, null=True, unique=True, default=None),
        ),
    ]
