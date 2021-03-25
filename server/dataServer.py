import socket
import struct
from datetime import datetime
import os
import psycopg2
import sys
import time

#Se obtiene dirección IP local y se define el puerto para el socket
port = 50000
server = socket.gethostbyname(socket.gethostname())
address = (server, port)

print("\n")

def start():
    delete_last_line()
    print("El servidor ha iniciado.")

    #Se crea el socket y se connecta a la base de datos
    UDPSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    UDPSocket.bind(address)
    dbconnection = psycopg2.connect(
        database = "test",
        host = os.environ["DB_HOST"],
        port = os.environ["DB_PORT"],
        user = os.environ["DB_USERNAME"],
        password = os.environ["DB_PASSWORD"])

    dbcursor = dbconnection.cursor()
#Mientras que el servidor esté habilitado:
    try:
        while True:
            #Se reciben packetes y se guardan los bytes. Se obtiene el ID y se decodifican los valores.
            (messageBytes, incomingAddress) = UDPSocket.recvfrom(120)
            vehicleID = messageBytes[:3].hex()
            [latitude, longitude, timeStamp] = struct.unpack_from('>ffi', messageBytes, 3)
            dateAndTime = str(datetime.fromtimestamp(timeStamp))
            messageList = [vehicleID, latitude, longitude, dateAndTime.split(" ")[0], dateAndTime.split(" ")[1]]

            print("\nRecibido de " + incomingAddress[0] + ":" + str(incomingAddress[1]) + ":\n")
            print("ID: " + messageList[0] + ", Latitud: " + str(messageList[1]) + ", Longitud: " + str(messageList[2]) + ", Fecha: " + messageList[3] + ", Hora: " + messageList[4])

            #Se modifica la base de datos con los nuevos datos recibidos.
            SQL = "UPDATE vehicle SET latitude = %(latitude)s, longitude = %(longitude)s, date = %(date)s, time = %(time)s WHERE id = %(id)s;"
            dbcursor.execute(SQL, {'id':messageList[0], 'latitude':messageList[1], 'longitude':messageList[2], 'date':messageList[3], 'time':messageList[4]})
            dbconnection.commit()
    except:
        print("\nHa ocurrido un error.")
        UDPSocket.close()

def delete_last_line():
    #Esta función se utiliza para borrar la última línea en la consola
    sys.stdout.write('\x1b[1A')
    sys.stdout.write('\x1b[2K')

def countdown(seconds):
    #Cuenta regresiva
    for s in range(seconds):
        t = 5 - s
        delete_last_line()
        print("El servidor se iniciará en " + str(server) + ":" + str(port) + " en " + str(t) + " segundos...")
        time.sleep(1)

#Se da la cuenta para iniciar el servidor
countdown(5)
start()