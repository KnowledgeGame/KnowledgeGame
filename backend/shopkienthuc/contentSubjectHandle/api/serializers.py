from rest_framework import serializers
from contentSubjectHandle.models import TitleContent, ContentSubject

class ContentSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentSubject
        fields = "__all__"
class TitleContentSerializer(serializers.ModelSerializer):
    contents = ContentSubjectSerializer(many=True, read_only=True)
    
    class Meta:
        model = TitleContent
        fields = "__all__"
