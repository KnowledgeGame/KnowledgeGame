from .serializers import CourseSerializer
from course.models import Course
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CourseAPIView(APIView):
    serializer_class = CourseSerializer
    
    def get(self, request):
        # Trích xuất giá trị nameCourse từ yêu cầu của client
        id_course = request.query_params.get('idCourse')
        
        if id_course is not None:
            # Nếu nameCourse được cung cấp, lọc queryset theo nameCourse
            queryset = Course.objects.filter(idCourse=id_course)
        else:
            # Nếu không có nameCourse, lấy toàn bộ queryset
            queryset = Course.objects.all()
        
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            data = request.data
            serializer = CourseSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except CourseSerializer.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    # def put(self,request):
    #     try:
    #         data = request.data
    #         idCourse = data.get("idCourse")
    #         nameCourse = data.get("nameCourse")
    #         describeCourse = data.get("describeCourse")
    #         course = Course.objects.get(idCourse=idCourse)
    #         Course.nameCourse = nameCourse
    #         Course.describeCourse = describeCourse
    #         course.save()  # Lưu thay đổi vào cơ sở dữ liệu
    #         return Response({'message': 'Student position updated successfully'})
    #     except:
    #         pass
    
    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idCourse":  
                        course = Course.objects.get(idCourse=value)
                    else:
                        setattr(course, key, value)
            course.save()
            return Response({'message': 'Student updated successfully'})
        except Course.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request,idCourse):
        id_course = idCourse
        print(id_course)
        if id_course is None:
            return Response({'message': 'Thiếu tham số idCourse'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = Course.objects.get(idCourse=id_course)
        except Course.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        course.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)