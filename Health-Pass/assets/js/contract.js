let iUbi = {};
let cUbi = {};
//setting HTTP web3 provider for faster get calls
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/e828d17619ef4075a3a0d824e16712b0"))
let address = '';
//initializing web3 providers and getting addresses
//0x741f40106a56bCe6Cc6CE87C6fC52B5883fD72ae is the address of the deployed contract
async function initETH(){
    const injectedProvider = window.ethereum;
    const addresses = await injectedProvider.enable();
    const iWeb3 = new Web3(injectedProvider);
    address = addresses[0];
    iUbi = new iWeb3.eth.Contract(
      abi,
      '0xb7bde5b807ba5bbf7fed74a8633ac1e7ef3eeaa2', {from: address}
    );
    cUbi = new iWeb3.eth.Contract(
      abi,
      '0xb7bde5b807ba5bbf7fed74a8633ac1e7ef3eeaa2', {from: address}
    );
    web3.eth.defaultAccount = web3.eth.accounts[0];
  }

//getting name variable and converting to utf8
function getName(cb){
  cUbi.methods.getName().call()
  .then(function(result){
      cb(web3.utils.toUtf8(result));
  });
  }

function getTrustedDoctor(cb){
    cUbi.methods.getTrustedDoctor().call()
    .then(function(result){
        cb(result);
    });
    }

function getIsSick(cb){
        cUbi.methods.getIsSick().call()
        .then(function(result){
            cb(result);
        });
        }

function getFeelsSick(cb){
    cUbi.methods.getFeelsSick().call()
      .then(function(result){
          cb(result);
          });
          }

function getFeelsSickPatient(address, cb){
    cUbi.methods.getFeelsSickPatient(address).call()
          .then(function(result){
            cb(result);
                    });
                    }

function getNameOfTrustedDoctor(cb){
  cUbi.methods.getTrustedDoctor().call()
  .then(function(x){
          cb(web3.utils.toUtf8(x));
  });
}

function getIsDoctor(cb){
    cUbi.methods.getIsDoctor().call()
    .then(function(result){
        cb(result);
    });
    }
//writing results in scoreboard
function setFeelsSick(feelsSick){
  iUbi.methods.setFeelsSick(feelsSick).send()
  .then(function(result){
      console.log(result);
  });
}

//writing results in scoreboard
function setIsSick(isSick, address){
  iUbi.methods.setIsSick(isSick, address).send()
  .then(function(result){
      console.log(result);
  });
}


//preparing interactive transaction to initalize user as well as closing modal after completion
function registerUser(name, isDoctor, trustedDoctor){
  iUbi.methods.registerUser(web3.utils.utf8ToHex(name), isDoctor, trustedDoctor).send()
  .then(function(result){
    console.log(result);
    window.location.href = "./mydashboard.html";
  });
}

function verifyMedical(doctor){
  iUbi.methods.verifyMedical(doctor).send()
  .then(function(result){
    console.log(result);
  });
}

//checking if user is initialized
function isInitialized(cb){
  cUbi.methods.isInitialized().call()
  .then(function(result){
      cb(result);
  });
}



//initalizing players result as well as nickname
function initializeUser(){

  getName(function(result){
    $("#name").text("Welcome Back " + result);
  });
  getIsDoctor(function(x){
    if(x){
      $("#dashboard").text("Doctor Dashboard");
      $('#two_doctor').show();
    } else {
      $("#dashboard").text("Patient Dashboard");
      $('#one_patient').show();
      $('#two_patient').show();
      getNameOfTrustedDoctor(function(x){$('#TrustedDoctorName').text(x);})
      getIsSick(function(x){
        text = x ? "Sick" : "Healthy";
        if(x){}$('#isSick').text(text);
      })
    }
  });
}
