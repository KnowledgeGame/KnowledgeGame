from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from contentSubjectHandle.models import TitleContent, ContentSubject
from .serializers import TitleContentSerializer, ContentSubjectSerializer
from subject.models import Subject


class TitleContentAndContentSubjectList(APIView):
    def get(self, request):
        title_contents = TitleContent.objects.all()
        content_subjects = ContentSubject.objects.all()

        title_content_serializer = TitleContentSerializer(title_contents, many=True)
        content_subject_serializer = ContentSubjectSerializer(content_subjects, many=True)

        data = {
            'title_contents': title_content_serializer.data,
            'content_subjects': content_subject_serializer.data
        }
        return Response(data)
    
class ContentSubjectList(APIView):
    def get(self, request):
        name_Subject = request.query_params.get('nameSubject')
        id_Subject = Subject.objects.filter(nameSubject=name_Subject).values('idSubject').first()
        if id_Subject:
            content_subjects = ContentSubject.objects.filter(idSubject=id_Subject['idSubject'])
            content_subject_serializer = ContentSubjectSerializer(content_subjects, many=True)

            data = {
                'content_subjects': content_subject_serializer.data
            }
            return Response(data)
        else:
            return Response(data = {
                'content_subjects': "NULL"
            })

class ContentSubjectOne(APIView):
    def get(self, request):
        name_Subject = request.query_params.get('nameSubject')
        idCS = request.query_params.get('idCS')
        id_Subject = Subject.objects.filter(nameSubject=name_Subject).values('idSubject').first()
        if id_Subject:
            content_subjects = ContentSubject.objects.filter(idSubject=id_Subject['idSubject'], idContentSubject=idCS)
            content_subject_serializer = ContentSubjectSerializer(content_subjects, many=True)

            data = {
                'content_subjects': content_subject_serializer.data
            }
            return Response(data)
        else:
            return Response(data = {
                'content_subjects': "NULL"
            })
        
class ContentSubjectsAll(APIView):
    def get(self, request):
        
        contentSubjects = ContentSubject.objects.all().order_by("idTitleContent")
        contentSubject_serializer = ContentSubjectSerializer(contentSubjects, many=True)

        data = {
            'contents_subject': contentSubject_serializer.data,
        }
        return Response(data)
    
    def post(self, request):
        try:
            data = request.data
            serializer = ContentSubjectSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ContentSubjectSerializer.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idContentSubject":  
                        contentSubject = ContentSubject.objects.get(idContentSubject=value)
                    else:
                        setattr(contentSubject, key, value)
            contentSubject.save()
            return Response({'message': 'Student updated successfully'})
        except ContentSubject.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    
    def delete(self, request,id):
        idContentSubject = id
        if idContentSubject is None:
            return Response({'message': 'Thiếu tham số idSubject'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            contentSubject = ContentSubject.objects.get(idContentSubject=idContentSubject)
        except ContentSubject.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        contentSubject.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)
    
        
class TitleContentList(APIView):
    def get(self, request):
        name_Subject = request.query_params.get('nameSubject')
        id_Subject = Subject.objects.filter(nameSubject=name_Subject).values('idSubject').first()
        if id_Subject:
            title_contents = TitleContent.objects.filter(idSubject=id_Subject['idSubject'])
            title_content_serializer = TitleContentSerializer(title_contents, many=True)

            data = {
                 'title_contents': title_content_serializer.data,
            }
            return Response(data)
        else:
            return Response(data = {
                'title_contents': "NULL"
            })
        
class TitleContentAll(APIView):
    def get(self, request):
        
        title_contents = TitleContent.objects.all().order_by("idSubject")
        title_content_serializer = TitleContentSerializer(title_contents, many=True)

        data = {
            'title_contents': title_content_serializer.data,
        }
        return Response(data)
    
    def post(self, request):
        try:
            data = request.data
            serializer = TitleContentSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except TitleContentSerializer.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idTitleContent":  
                        titleContent = TitleContent.objects.get(idTitleContent=value)
                    else:
                        setattr(titleContent, key, value)
            titleContent.save()
            return Response({'message': 'Student updated successfully'})
        except TitleContent.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request,id):
        idTitleContent = id
        if idTitleContent is None:
            return Response({'message': 'Thiếu tham số idSubject'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            titleContent = TitleContent.objects.get(idTitleContent=idTitleContent)
        except TitleContent.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        titleContent.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)
    
    