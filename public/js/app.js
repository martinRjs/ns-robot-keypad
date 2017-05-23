var App = {};

class RobotConnect {
  constructor() {
      this.url = 'https://ns-functions.azurewebsites.net/api/HttpTriggerCSharp1?code=KKElBla0iFUi0b4c9bWOjDI843OwSbrQ2nNcL4rJTxb4arqnlba2vA==';
  }

  exec() {
    console.log('executing request . . .');
    // $.post(this.url, {'name': 'left led off'}, (data) => console.log(data));

    // $.ajax({
    //   url: this.url,
    //   data: JSON.stringify({"name": "left led off"}),
    //   type: 'GET',
    //   contentType: "application/json; charset=utf-8",
    //   headers: { 'Access-Control-Allow-Origin': '*' },
    //   success: function() { alert("Success"); },
    //   error: function(xhr, text, error) {
    //     console.log(text);
    //     console.log(error);
    //   }
    // });

    var http = new XMLHttpRequest();
    http.open("POST", this.url, true);

    http.setRequestHeader("Content-type", "application/json; charset=utf-8");

    http.onreadystatechange = function() { //Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
      }
    }

    http.send({name: "left led off"});
  }
}

class KeyPad {
  constructor(robotConnect) {
    this.selectedKey = null;
    this.isLedOn = false;
    this.robotConnect = robotConnect;
  }

  initialize() {
    this._setupHandlers();
  }

  _setupHandlers (){
    var keys = Array.from(document.getElementsByClassName('arrow-key'));
    var self = this;
    keys.forEach((key) => {
      key.addEventListener('click', (e)  => {
         this._selectedKey = e.target.dataset.arrowType;
         this.robotConnect.exec();
      });
    });
  }
}


$(function(){
  App.keyPad = new KeyPad(new RobotConnect());
  App.keyPad.initialize();
});
