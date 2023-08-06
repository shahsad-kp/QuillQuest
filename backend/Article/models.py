from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Categories'


class Article(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')
    author = models.ForeignKey('User.User', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='articles', null=True, blank=True)
    tags = models.ManyToManyField('Tag', blank=True, related_name='articles')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(to='User.User', related_name='liked_articles')
    blocks = models.ManyToManyField(to='User.User', related_name='blocked_articles')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Articles'

    def like(self, user):
        if user in self.likes.all():
            self.likes.remove(user)
            return False
        else:
            self.likes.add(user)
            return True

    def block(self, user):
        if user in self.blocks.all():
            self.blocks.remove(user)
            return False
        else:
            try:
                self.likes.remove(user)
            except _:
                pass
            self.blocks.add(user)
            return True


class Tag(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Tags'
