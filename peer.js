
var peer
var conn



function load(){
  peer = new Peer({key: '5lioivsa9fmeu3di',  debug: 3}); 
  console.log(peer.id);
  peer.on("open",function(){
    peerid.innerHTML = peer.id
  });
  peer.on('connection', handle_new_connection);
  peer.on("error",function(err){
    console.log("error", err);
  });

}


function handle_new_connection(c)
{
  console.log('new connection', c, c.open);
  conn = c;
  conn.open = true;
  conn.send("HI");
  conn.on('data', function(data){
  // Will print 'hi!'
    console.log("From");
    console.log(rid.value);
    console.log(data);
  });
}

function connect(){
  console.log("about to connect to <", rid.value, ">");
  conn = peer.connect(rid.value); 
  conn.open = true;
  console.log("connected",conn);
  conn.send("hi");

    conn.on('data', function(data){
    // Will print 'hi!'
      console.log("From");
      console.log(rid.value);
      console.log(data);
    });


}

function send(){
  console.log("Sending");
  console.log( message.value)
  conn.send( message.value)
  message.value = "";
}



function login1(){
  login(PUB);
}
function login2(){
  login(PUB2);
}

function connect1(){
  connect(PUB2)
}
function connect2(){
  connect(PUB)
}

