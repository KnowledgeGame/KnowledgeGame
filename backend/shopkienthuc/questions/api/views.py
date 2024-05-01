from rest_framework.views import APIView
from rest_framework.response import Response
from questions.models import Questions
from .serializers import QuestionsSerializer
from django.http import JsonResponse
from rest_framework import status

class QuestionsSubjectList(APIView):
    def get(self, request):
        idCS = request.query_params.get('idCS')
        if idCS:
            id_Subject = Questions.objects.filter(idContentSubject=idCS)
            questions_serializer = QuestionsSerializer(id_Subject, many=True)
            data = {
                'questions': questions_serializer.data
            }
            return Response(data)
        else:
            return Response(data={
                'content_subjects': "NULL"
            })

    def post(self, request):
        try:
            print(request.body.decode('utf-8'))
            return Response({'message': 'Data processed successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class QuestionsSubjectAll(APIView):
    def get(self, request):
        id_Subject = Questions.objects.all().order_by("idContentSubject")
        questions_serializer = QuestionsSerializer(id_Subject, many=True)
        data = {
            'questions': questions_serializer.data
        }
        return Response(data)
    
    def post(self, request):
        try:
            data = request.data
            serializer = QuestionsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except QuestionsSerializer.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idQuestion":  
                        question = Questions.objects.get(idQuestion=value)
                    else:
                        setattr(question, key, value)
            question.save()
            return Response({'message': 'Student updated successfully'})
        except Questions.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request,id):
        idQuestion = id
        if idQuestion is None:
            return Response({'message': 'Thiếu tham số idCourse'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            question = Questions.objects.get(idQuestion=idQuestion)
        except Questions.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        question.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)
