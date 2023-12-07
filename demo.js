var connection_status= false;

function BtnConnect(){

    clientID = document.getElementById("box_clientID").value;
    host = document.getElementById("box_host").value;
    port = document.getElementById("box_port").value;

    user_name = document.getElementById("box_user").value;
    pass_word = document.getElementById("box_password").value


    // Create a client instance
// client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
client = new Paho.MQTT.Client(host, Number(port), clientID);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
    onSuccess:onConnect,
    userName: user_name,
    password: pass_word,
    mqttVersion:3,
    
});

}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    // console.log("onConnect");
    alert("Connected Successfully");
    connection_status = true ;
    // client.subscribe("World");
    // message = new Paho.MQTT.Message("Hello");
    // message.destinationName = "World";
    // client.send(message);
  }
  
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
  
  // called when a message arrives
  function onMessageArrived(message) {
    
    console.log("onMessageArrived:"+message.payloadString);
    document.getElementById("txt_sub").value = message.payloadString + '\n' ;
  }

  function sub_topic()
  {

    if(connection_status)
    {
        subTopic = document.getElementById("box_topic").value;
        qos = document.getElementById("box_QoS").value;
        client.subscribe(subTopic);
    }
  }

  function pub_topic()
  {
    pubTopic = document.getElementById("box_pub").value;
    payload = document.getElementById("txt_pub").value;

    message = new Paho.MQTT.Message(payload);
    message.destinationName = pubTopic;
    client.send(message);
  }