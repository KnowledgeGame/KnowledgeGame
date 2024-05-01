import json
import uuid
import hmac
import hashlib
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class MomoApiView(APIView):  
    def get(self, request):
        endpoint = "https://test-payment.momo.vn/v2/gateway/api/create"
        partnerCode = "MOMO"
        accessKey = "F8BBA842ECF85"
        secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
        orderInfo = "pay with MoMo"
        redirectUrl = "http://localhost:3000/Momo"
        ipnUrl = "http://localhost:3000/Momo"
        amount = "50000"
        orderId = str(uuid.uuid4())
        requestId = str(uuid.uuid4())
        requestType = "captureWallet"
        extraData = ""  # pass empty value or Encode base64 JsonString

        # Tạo chuỗi raw signature
        rawSignature = f"accessKey={accessKey}&amount={amount}&extraData={extraData}&ipnUrl={ipnUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={partnerCode}&redirectUrl={redirectUrl}&requestId={requestId}&requestType={requestType}"

        # In ra raw signature
        print("--------------------RAW SIGNATURE----------------")
        print(rawSignature)

        # Tính toán signature
        h = hmac.new(bytes(secretKey, 'ascii'), bytes(rawSignature, 'ascii'), hashlib.sha256)
        signature = h.hexdigest()
        print("--------------------SIGNATURE----------------")
        print(signature)

        # Tạo JSON object gửi đến MoMo endpoint
        data = {
            'partnerCode': partnerCode,
            'partnerName': "Test",
            'storeId': "MomoTestStore",
            'requestId': requestId,
            'amount': amount,
            'orderId': orderId,
            'orderInfo': orderInfo,
            'redirectUrl': redirectUrl,
            'ipnUrl': ipnUrl,
            'lang': "vi",
            'extraData': extraData,
            'requestType': requestType,
            'signature': signature
        }
        print("--------------------JSON REQUEST----------------\n")
        print(data)

        # Chuyển đổi data sang định dạng JSON
        data_json = json.dumps(data)

        # Tính toán Content-Length
        clen = len(data_json)

        # Gửi yêu cầu POST đến endpoint
        response = requests.post(endpoint, data=data_json, headers={'Content-Type': 'application/json', 'Content-Length': str(clen)})

        # In ra JSON response
        print("--------------------JSON response----------------\n")
        print(response.json())

        # In ra giá trị của 'payUrl' từ JSON response
        print(response.json().get('payUrl', 'No payUrl found'))
        return Response(response.json())

