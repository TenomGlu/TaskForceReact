# Generated by Django 4.2.1 on 2023-05-22 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Website", "0003_alter_sites_latitude"),
    ]

    operations = [
        migrations.RemoveField(model_name="sites", name="id",),
        migrations.AlterField(
            model_name="sites",
            name="ZIP",
            field=models.TextField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
