import socket
import threading
import struct
from datetime import datetime, timezone
import keyboard

loadDataTxt = open("loadData.txt","w+")

port = 50000
server = socket.gethostbyname(socket.gethostname())
address = (server, port)

print("\nEl servidor se iniciará en " + str(server) + ":" + str(port) + ". Presione enter para iniciar.")
keyboard.wait('enter')

def start():
    print("\nEl servidor ha iniciado.")
    UDPSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    UDPSocket.bind(address)
    while True:
        (messageBytes, incomingAddress) = UDPSocket.recvfrom(120)
    
        [latitude, longitude, timeStamp] = struct.unpack('>ffi', messageBytes)
        dateAndTime = str(datetime.fromtimestamp(timeStamp))

        loadDataTxt = open("loadData.txt","w")

        messageList = [str(latitude), str(longitude), dateAndTime.split(" ")[0], dateAndTime.split(" ")[1]]

        print("\nRecibido de " + incomingAddress[0] + ":" + str(incomingAddress[1]) + ":\n")
        print("Latitud: " + messageList[0] + ", Longitud: " + messageList[1] + ", Fecha: " + messageList[2] + ", Hora: " + messageList[3])
        
        messageList = " ".join(messageList)
        loadDataTxt.write(messageList)

start()