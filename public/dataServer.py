import socket
import struct
from datetime import datetime
import keyboard

#Se obtiene dirección IP local y se define el puerto para el socket
port = 50000
server = socket.gethostbyname(socket.gethostname())
address = (server, port)

print("\nEl servidor se iniciará en " + str(server) + ":" + str(port) + ". Presione enter para iniciar.")
keyboard.wait('enter')

def start():
    print("\nEl servidor ha iniciado.")

    #Se crea el socket en IP local y puerto 50000
    UDPSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    UDPSocket.bind(address)
    #Mientras que el servidor esté habilitado:
    while True:
        #Se abre el .txt y se obtiene su contenido
        loadDataTxt = open("loadData.txt","r")
        oldDataTxt = loadDataTxt.read()
        loadDataTxt.close()

        lines = oldDataTxt.split("\n")

        #Se reciben packetes y se guardan los bytes.
        (messageBytes, incomingAddress) = UDPSocket.recvfrom(120)

        print(UDPSocket.recv(120))
        #Se toman solo los 3 primeros bytes, los cuales son el ID del vehículo.
        vehicleID = messageBytes[:3].hex()

        #Se decodifican la latitud, la longitud y el timestamp
        [latitude, longitude, timeStamp] = struct.unpack_from('>ffi', messageBytes, 3)
        dateAndTime = str(datetime.fromtimestamp(timeStamp))

        #Se guarda todo en un arreglo
        messageList = [vehicleID, str(latitude), str(longitude), dateAndTime.split(" ")[0], dateAndTime.split(" ")[1]]

        print("\nRecibido de " + incomingAddress[0] + ":" + str(incomingAddress[1]) + ":\n")
        print("ID: " + messageList[0] + ", Latitud: " + messageList[1] + ", Longitud: " + messageList[2] + ", Fecha: " + messageList[3] + ", Hora: " + messageList[4])
        
        #Se convierte el arreglo en una string con cada elemento separado por un espacio
        messageList = " ".join(messageList)

        #Se determina la linea que se editará basado en el ID del paquete recibido
        if vehicleID == "efee70":
            lines[0] = messageList
        elif vehicleID == "487a8d":
            lines[1] = messageList
        elif vehicleID == "b7ea25":
            lines[2] = messageList
        else:
            print("Error")

        newDataTxt = "\n".join(lines)

        #Se guarda la nueva información en un .txt
        loadDataTxt = open("loadData.txt","w")
        loadDataTxt.write(newDataTxt)

#Se inicia el servidor
start()