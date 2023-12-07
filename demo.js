var connection_status= false;

function BtnConnect(){

    clientID = document.getElementById("box_clientID").value;
    host = document.getElementById("box_host").value;
    port = document.getElementById("box_port").value;

    user_name = document.getElementById("box_user").value;
    pass_word = document.getElementById("box_password").value

    if(clientID != '' && host != '' && port != '' && user_name != '' && pass_word != '')
    {
      client = new Paho.MQTT.Client(host, Number(port), clientID);

      // set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      // connect the client
      client.connect({
          onSuccess:onConnect,
          userName: user_name,
          password: pass_word,
          mqttVersion:4
      });
    }
    else{
      alert('Please fill the broker information in boxs.');
    }



}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    document.getElementById('btn_connect').disabled = true ;
    document.getElementById('btn_disconnect').disabled = false ;
    alert("Successfull connect to Broker!");
    connection_status=true;
    // client.subscribe("World");
    // message = new Paho.MQTT.Message("Hello");
    // message.destinationName = "World";
    // client.send(message);
  }
  
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
      alert("onConnectionLost:"+responseObject.errorMessage);
    }
  }
  
  // called when a message arrives
  function onMessageArrived(message) {
    const newMessage ="";
    console.log("onMessageArrived:"+message.payloadString);
    document.getElementById("txt_sub").value += message.payloadString + '\n';
  }
  

  function sub_topic()
  {

    if(connection_status)
    {
        subTopic = document.getElementById("box_topic").value;
        qos = document.getElementById("box_QoS").value;
        client.subscribe(subTopic);
        alert('this topic was subscribe!');
    }
  }

  function pub_topic()
  {
    if(connection_status)
    {
      pubTopic = document.getElementById("box_pub").value;
      payload = document.getElementById("txt_pub").value;
  
      message = new Paho.MQTT.Message(payload);
      message.destinationName = pubTopic;
      client.send(message);
      // alert('this topic was published to broker!');
    }
    
  }

  function btnDiscon()
  {
    
      client.disconnect();
      document.getElementById('btn_disconnect').disabled = true ;
      document.getElementById('btn_connect').disabled = false ;
      alert('Disconnect successfull');
      connection_status=false;
      
    
  }
