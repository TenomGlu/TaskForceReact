# Generated by Django 4.2.1 on 2023-05-22 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Website", "0010_alter_sites_latitude_alter_sites_uuid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sites", name="Longitude", field=models.FloatField(),
        ),
    ]
