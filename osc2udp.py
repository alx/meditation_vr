import OSC
import threading
import socket

#------OSC Server-------------------------------------#
# local maching running osc2udp.py script
receive_address = '192.168.129.160', 57121

#UDP
# windows machine running freepie and steamvr
import socket
UDP_IP = "192.168.129.201"
UDP_PORT = 5005

# OSC Server. there are three different types of server.
s = OSC.ThreadingOSCServer(receive_address)

# this registers a 'default' handler (for unmatched messages)
s.addDefaultHandlers()

# define a message-handler function for the server to call.
def printing_handler(addr, tags, value, source):
   if addr=='/muse/elements/theta_absolute':
       print "theta_absolute", '%.3f' % value[0]
       sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
       sock.sendto('%.3f' % value[0], (UDP_IP, UDP_PORT))

s.addMsgHandler("/muse/elements/theta_absolute", printing_handler)

def main():
   # Start OSCServer
   print "Starting OSCServer"
   st = threading.Thread(target=s.serve_forever)
   st.start()

main()
