
var peer
var connections = {}

//todo handle disconnects

var announce;



function load(){
  peer = new Peer({key: '5lioivsa9fmeu3di'}); 
  console.log(peer.id);
  peer.on("open",function(){
    peerid.innerHTML = peer.id
    announce = function(){
        $.get("/announce?peerid="+peer.id);
        console.log("announcing", peer.id);
    }
    announce();
    setInterval(announce, 60000);

    $.each(peers, function(index,node){
      //try{
        connect(node)
        console.log("peer",node);
      //}catch($ERR){
        //console.error($ERR);
      //}

    });
  });
  peer.on('connection', handle_new_connection);
  peer.on("error",function(err){
    //console.log("error", err);
  });

}


function new_peer(conn){
  conn.open = true;
  conn.send("HI");
  if(!( conn.peer  in connections)){
  connections[conn.peer] = conn
  ulpeers.innerHTML += "<li>"+conn.peer+"</li>"
  }
}

function append_data(peer_id, data) {
  datadiv.innerHTML+="<div class='peerid'>"+peer_id+"</div><div class='message'>"+data+"</div>";
}


function handle_new_connection(conn)
{
  new_peer(conn)
  conn.on('data', function(data){
    append_data(conn.peer, data);
  });
}

function connect(node){
  var conn = peer.connect(node);
  conn.open = true;
  conn.on('data', function(data){
    console.log(conn, conn.peer);
    append_data(conn.peer, data);
    new_peer(conn)
  });
  return conn;
}
var res;

function send_all(){
  append_data(peer.id, message.value);
  $.each(connections, function(node, conn){
    try{
      res = conn.send( message.value)
      console.log(conn, res);
    }catch($ERRSEND){
      console.log($ERRSEND);
    }
  });
  message.value = "";
}

