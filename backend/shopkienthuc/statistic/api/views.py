
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from statistic.models import Statistic
from .serializers import StatisticSerializer
from rest_framework import status

class StatisticsAPIViewAll(APIView):
    def get(self, request):
        
        statistics = Statistic.objects.all().order_by("time")
        statistic_serializer = StatisticSerializer(statistics, many=True)

        data = {
            'statistics': statistic_serializer.data,
        }
        return Response(data)
    
class StatisticStudents(APIView):
    def get(self, request):
        
        statistics = Statistic.objects.filter(position="Student").order_by("-time")
        statistic_serializer = StatisticSerializer(statistics, many=True)
        return Response(statistic_serializer.data)
    
    def post(self, request):
        
        try:
            data = request.data
            # Chuyển đổi đối tượng datetime.date thành chuỗi định dạng YYYY-MM-DD và dạng date()-Giá trị ngày
            data["time"] = datetime.strptime(data["time"], "%Y-%m-%dT%H:%M").date()
            # Chuyển đổi giá trị price thành kiểu số thực
            data["price"] = float(data["price"])
            data['idAccount'] = int(data['idAccount'])
            print(data)
            serializer = StatisticSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Add thành công'}, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Statistic.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idTransactionHistory":  
                        statistic = Statistic.objects.get(idTransactionHistory=value)
                    else:
                        setattr(statistic, key, value)
            statistic.save()
            return Response({'message': 'Student updated successfully'})
        except Statistic.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request,id):
        idTransactionHistory = id
        if idTransactionHistory is None:
            return Response({'message': 'Thiếu tham số idSubject'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            statistic = Statistic.objects.get(idTransactionHistory=idTransactionHistory)
        except Statistic.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        statistic.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)
    
class StatisticTeachers(APIView):
    def get(self, request):
        statistics = Statistic.objects.filter(position="Teacher").order_by("-time")
        statistic_serializer = StatisticSerializer(statistics, many=True)
        return Response(statistic_serializer.data)
    
    def post(self, request):
        
        try:
            data = request.data
            # Chuyển đổi đối tượng datetime.date thành chuỗi định dạng YYYY-MM-DD và dạng date()-Giá trị ngày
            data["time"] = datetime.strptime(data["time"], "%Y-%m-%dT%H:%M").date()
            # Chuyển đổi giá trị price thành kiểu số thực
            data["price"] = float(data["price"])
            data['idAccount'] = int(data['idAccount'])
            print(data)
            serializer = StatisticSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Add thành công'}, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Statistic.DoesNotExist:    
            return Response(False)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def put(self, request):
        try:
            data = request.data  # Sử dụng `request.data` để truy cập dữ liệu gửi kèm yêu cầu POST
            print(data)
            for key, value in data.items():
                if value != "":
                    if key == "idTransactionHistory":  
                        statistic = Statistic.objects.get(idTransactionHistory=value)
                    else:
                        setattr(statistic, key, value)
            statistic.save()
            return Response({'message': 'Student updated successfully'})
        except Statistic.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request,id):
        idTransactionHistory = id
        if idTransactionHistory is None:
            return Response({'message': 'Thiếu tham số idSubject'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            statistic = Statistic.objects.get(idTransactionHistory=idTransactionHistory)
        except Statistic.DoesNotExist:
            return Response({'message': 'Không tìm thấy khóa học'}, status=status.HTTP_404_NOT_FOUND)
        
        statistic.delete()
        return Response({'message': 'Xóa khóa học thành công'}, status=status.HTTP_200_OK)