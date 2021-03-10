import socket
import threading
import struct
from datetime import datetime, timezone
import keyboard

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
        loadDataTxt = open("loadData.txt","r")

        oldDataTxt = loadDataTxt.read()

        loadDataTxt.close()

        lines = oldDataTxt.split("\n")

        (messageBytes, incomingAddress) = UDPSocket.recvfrom(120)

        vehicleID = messageBytes[:3].hex()

        [latitude, longitude, timeStamp] = struct.unpack_from('>ffi', messageBytes, 3)
        dateAndTime = str(datetime.fromtimestamp(timeStamp))

        messageList = [vehicleID, str(latitude), str(longitude), dateAndTime.split(" ")[0], dateAndTime.split(" ")[1]]

        print("\nRecibido de " + incomingAddress[0] + ":" + str(incomingAddress[1]) + ":\n")
        print("ID: " + messageList[0] + ", Latitud: " + messageList[1] + ", Longitud: " + messageList[2] + ", Fecha: " + messageList[3] + ", Hora: " + messageList[4])
        
        messageList = " ".join(messageList)

        if vehicleID == "efee70":
            lines[0] = messageList
        elif vehicleID == "487a8d":
            lines[1] = messageList
        elif vehicleID == "b7ea25":
            lines[2] = messageList
        else:
            print("Error")

        newDataTxt = "\n".join(lines)

        loadDataTxt = open("loadData.txt","w")

        loadDataTxt.write(newDataTxt)

start()