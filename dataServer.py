import socket
import struct
from datetime import datetime
import os
import psycopg2
from psycopg2 import sql
import sys
import time
import logging

# Loopback address and port 50000 are defined for starting socket.
port = 50000
server = socket.gethostbyname(socket.gethostname())
address = (server, port)
logger = logging.Logger('catch_all')

print("\n")

def start():
    delete_last_line()
    print("El servidor ha iniciado.")

    # Local socket and database onnection are initiated.
    [UDPSocket, dbconnection, dbcursor] = startConnections(address)

# Thread to run while server is active:
    try:
        while True:
            # Packets are received and bytes are decoded.
            messageList = receiveData(UDPSocket)

            # Queries to update database with the received data are performed.
            SQL = "UPDATE vehicle SET latitude = %(latitude)s, longitude = %(longitude)s, tstamp = %(tstamp)s, gasolineLevel = %(gasolineLevel)s WHERE id = %(id)s;"
            dbcursor.execute(SQL, {'id':messageList[0], 'latitude':messageList[1], 'longitude':messageList[2], 'tstamp':messageList[3], 'gasolineLevel':messageList[4]})
            dbcursor.execute(sql.SQL("INSERT INTO {} (tstamp, latitude, longitude, gasolineLevel) values (%s, %s, %s, %s);").format(sql.Identifier(messageList[0])),[messageList[3], messageList[1], messageList[2], messageList[4]])
            dbconnection.commit()

    # If something stops the thread the user can restart it or stop the program.
    except Exception as e:

        logger.exception(e)
        UDPSocket.close()
        dbconnection.close()
        
        answer = input("\nSomething went wrong. ¿Do you want to restart the server? (y/n): ")

        yes = answer == "y" or answer == "Y";
        no = answer == "n" or answer == "N";

        if yes:
            countdown(5)
            start()
        elif no:
            print("\nThe server has closed the connection. Bye!!!.\n")
        else:
            print("\nInvalid entry, The server has closed the connection.\n")

# This function deletes the last line in console. It's only use is to delete the last displayed number during countdown to server start.
def delete_last_line():
    sys.stdout.write('\x1b[1A')
    sys.stdout.write('\x1b[2K')

# This function performs a countdown, showing the remaining number of seconds in console.
def countdown(seconds):
    for s in range(seconds):
        t = 5 - s
        delete_last_line()
        print("El servidor se iniciará en " + str(server) + ":" + str(port) + " en " + str(t) + " segundos...")
        time.sleep(1)

# This function starts the local server and start the connection to the database server.
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

# This function receives data from the socket object passed as parameter, decodes it and returns a list of the received data.
def receiveData(UDPSocket):
    (messageBytes, incomingAddress) = UDPSocket.recvfrom(120)
    vehicleID = str(messageBytes[:3].hex()).replace("'", '"')
    [latitude, longitude, timestamp, gasolineLevel] = struct.unpack_from('>ffiB', messageBytes, 3)
    dateAndTime = str(datetime.fromtimestamp(timestamp)).split(" ")
    messageList = [vehicleID, latitude, longitude, timestamp, gasolineLevel]

    print("\nPacket received from " + incomingAddress[0] + ":" + str(incomingAddress[1]) + ":\n")
    print("ID: " + messageList[0] + ", Latitude: " + str(messageList[1]) + ", Longitude: " + str(messageList[2]) + ", Date: " + dateAndTime[0] + ", Time: " + dateAndTime[1] + ", Gasoline Level: " + messageList[4] + "%.")
    return messageList

# 5 second countdown and call to start method for initializing server.
countdown(5)
start()
