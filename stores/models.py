from django.db import models
from django.core.validators import RegexValidator
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True,
                            help_text="Category name")
    description = models.TextField(
        blank=True, help_text="Category description")

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return str(self.name)


class Store(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
    street = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=2, null=True, blank=True)
    zip_code = models.IntegerField(blank=True, default=0)
    website = models.URLField(max_length=420, blank=True)
    phone_number = models.CharField(validators=[RegexValidator(
        regex=r'^\1?\d{9,10}$')], max_length=10, blank=True)
    logo_image = models.ImageField(upload_to='Logos', blank=True)
    email = models.EmailField(max_length=24, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return "{},{}".format(self.name, self.city)


class Product(models.Model):
    store = models.ForeignKey(
        Store, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    image = models.ImageField(upload_to='Products', blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return "{} - {} - {}".format(self.name, self.store.name, self.category.name)
