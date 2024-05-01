
from rest_framework.views import APIView
from .serializers import SubjectSerializer
from subject.models import Subject
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class SubjectAPIView(APIView):
    def get(self, request):
        queryset = Subject.objects.all()
        serializer_class = SubjectSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    def post(self, request):
        try:
            data = request.data
            serializer = SubjectSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except SubjectSerializer.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idSubject":  
                        subject = Subject.objects.get(idSubject=value)
                    else:
                        setattr(subject, key, value)
            subject.save()
            return Response({'message': 'Student updated successfully'})
        except Subject.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def delete(self, request,id):
        idSubject = id
        if idSubject is None:
            return Response({'message': 'Thiếu tham số idSubject'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            subject = Subject.objects.get(idSubject=idSubject)
        except Subject.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        subject.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)