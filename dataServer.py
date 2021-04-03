import socket
import struct
from datetime import datetime
import os
import psycopg2
import sys
import time
import logging

#Se obtiene dirección IP local y se define el puerto para el socket
port = 50000
server = socket.gethostbyname(socket.gethostname())
address = (server, port)
logger = logging.Logger('catch_all')

print("\n")

def start():
    delete_last_line()
    print("El servidor ha iniciado.")

    #Se crea el socket y se connecta a la base de datos
    [UDPSocket, dbconnection, dbcursor] = startConnections(address)

#Mientras que el servidor esté habilitado:
    try:
        while True:
            #Se reciben packetes y se guardan los bytes. Se obtiene el ID y se decodifican los valores.
            messageList = receiveData(UDPSocket)

            #Se modifica la base de datos con los nuevos datos recibidos.
            SQL = "UPDATE vehicle SET latitude = %(latitude)s, longitude = %(longitude)s, tstamp = %(tstamp)s WHERE id = %(id)s; \nINSERT INTO %(id)s (tstamp, latitude, longitude) values (%(tstamp)s, %(latitude)s, %(longitude)s);"
            dbcursor.execute(SQL, {'id':messageList[0], 'latitude':messageList[1], 'longitude':messageList[2], 'tstamp':messageList[3]})
            dbconnection.commit()

    except BaseException as e:

        logger.error(str(e))
        UDPSocket.close()
        dbconnection.close()
        
        answer = input("\nHa ocurrido un error. ¿Reiniciar? (S/N): ")

        yes = answer == "S";
        no = answer == "N";

        if yes:
            countdown(5)
            start()
        elif no:
            print("\nEl servidor se ha cerrado.\n")
        else:
            print("\nEntrada inválida, el servidor se ha cerrado.\n")

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

def startConnections(address):
    UDPSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    UDPSocket.bind(address)
    dbconnection = psycopg2.connect(
        database = "locationdata",
        host = os.environ["DB_HOST"],
        port = os.environ["DB_PORT"],
        user = os.environ["DB_USERNAME"],
        password = os.environ["DB_PASSWORD"])
        
    dbcursor = dbconnection.cursor()
    return UDPSocket, dbconnection, dbcursor

def receiveData(UDPSocket):
    (messageBytes, incomingAddress) = UDPSocket.recvfrom(120)
    vehicleID = messageBytes[:3].hex()
    [latitude, longitude, timestamp] = struct.unpack_from('>ffi', messageBytes, 3)
    dateAndTime = str(datetime.fromtimestamp(timestamp)).split(" ")
    messageList = [vehicleID, latitude, longitude, timestamp]

    print("\nRecibido de " + incomingAddress[0] + ":" + str(incomingAddress[1]) + ":\n")
    print("ID: " + messageList[0] + ", Latitud: " + str(messageList[1]) + ", Longitud: " + str(messageList[2]) + ", Fecha: " + dateAndTime[0] + ", Hora: " + dateAndTime[1])
    return messageList

#Se da la cuenta para iniciar el servidor
countdown(5)
start()
