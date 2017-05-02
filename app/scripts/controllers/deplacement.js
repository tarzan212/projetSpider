/**
 * Created by Paul on 28/01/2017.
 */

angular.module('spiderApp')
  .controller('deplacementCtrl', function($scope) {

    $scope.positionX=200;
    $scope.positionY=200;
    $scope.mouseIsDown=false;
    posXstr=$scope.positionX.toString();
    posYstr=$scope.positionY.toString();

    $scope.posjoy = {
      "left" : posXstr+"px",
      "top" : posYstr+"px",
      "position" : "absolute",
      "height" : "100px"
    };


    var socket = io.connect('http://localhost:8080');




    $scope.clickDown = function(event){
      if($scope.mouseIsDown==false)
      {
        $scope.mouseIsDown = true;
        $scope.positionX = event.target.offsetLeft+(event.offsetX-50);
        $scope.positionY = event.target.offsetTop+(event.offsetY-50);

        posXstr=$scope.positionX.toString();
        posYstr=$scope.positionY.toString();

        $scope.posjoy = {
          "left" : posXstr+"px",
          "top" : posYstr+"px",
          "position" : "relative",
          "height" : "100px"
        };
      }
      else
      {
        $scope.mouseIsDown = false;
        $scope.positionX = 200;
        $scope.positionY = 200;
        console.log($scope.mouseIsDown);

        posXstr=$scope.positionX.toString();
        posYstr=$scope.positionY.toString();

        $scope.posjoy = {
          "left" : posXstr+"px",
          "top" : posYstr+"px",
          "position" : "relative",
          "height" : "100px"
        };
      }
      socket.emit('message', ($scope.positionX-200)+','+(-($scope.positionY-200)));
    };

    /*
    $scope.moveJoystick = function(event) {
      if ($scope.mouseIsDown == true) {
        if ( Math.sqrt(Math.pow(((event.target.offsetLeft+(event.offsetX-50))-200)/100,2)+Math.pow(((event.target.offsetTop+(event.offsetY-50))-200)/100,2)) > 0 && Math.sqrt(Math.pow(((event.target.offsetLeft+(event.offsetX-50))-200)/100,2)+Math.pow(((event.target.offsetTop+(event.offsetY-50))-200)/100,2)) < 1)
        {
        $scope.positionX = event.target.offsetLeft + (event.offsetX - 50);
        $scope.positionY = event.target.offsetTop + (event.offsetY - 50);
        console.log($scope.positionX);
        console.log($scope.positionY);
        posXstr = $scope.positionX.toString();
        posYstr = $scope.positionY.toString();

        $scope.posjoy = {
          "left": posXstr + "px",
          "top": posYstr + "px",
          "position": "relative",
          "height": "100px"
        };
      }
      }
    };*/

    $scope.moveJoystickOutside = function(event) {
      if ($scope.mouseIsDown == true) {

        ecartX=parseInt(getComputedStyle(joystick).left, 10);
        ecartY=parseInt(getComputedStyle(joystick).top, 10);

        //on retranche 200 la marge du boutton araigné jusqu'au bord du div #joystick + 50 pour arriver au centre de l'image
        //+20 en Y à cause du footer qui sera toujours de taille constante
        positionXProvisoire = event.clientX - ecartX -250;
        positionYProvisoire = -(event.clientY - ecartY-330);
        console.log("posi prov X: "+positionXProvisoire);
        console.log("posi prov Y: "+positionYProvisoire);

        //partie dans le cercle
        if ( Math.sqrt(Math.pow(positionXProvisoire/100,2)+Math.pow(positionYProvisoire/100,2)) >= 0 && Math.sqrt(Math.pow(positionXProvisoire/100,2)+Math.pow(positionYProvisoire/100,2)) < 1)
        {
          //ancienne methode :
          //$scope.positionX = event.target.offsetLeft + (event.offsetX - 50);
          //$scope.positionY = event.target.offsetTop + (event.offsetY - 50);

          //50=moitié de la dimension de l'image du bouton avec l'araignée.
          //a retrancher car on veut le centre de l'image et pas le coin supérieur gauche.
          $scope.positionX=event.clientX-ecartX-50;
          $scope.positionY=event.clientY-ecartY-130;
          console.log("posi X: "+$scope.positionX);
          console.log("posi Y: "+$scope.positionY);

          posXstr = $scope.positionX.toString();
          posYstr = $scope.positionY.toString();

          $scope.posjoy = {
            "left": posXstr + "px",
            "top": posYstr + "px",
            "position": "relative",
            "height": "100px"
          };
        }
        //partie en dehors du cercle
        else
          {
            hypothenuse=Math.sqrt(Math.pow(positionXProvisoire,2)+Math.pow(positionYProvisoire,2));
            angle=Math.acos(positionXProvisoire/hypothenuse);

            if(-(event.clientY - ecartY-330)<0)
            {
              $scope.positionX=parseInt((Math.cos(angle)*100)+200);
              $scope.positionY=parseInt((Math.sin(angle)*100)+200);
            }
            else
            {
              $scope.positionX=parseInt((Math.cos(angle)*100)+200);
              $scope.positionY=parseInt((-Math.sin(angle)*100)+200);
            }
            posXstr = $scope.positionX.toString();
            posYstr = $scope.positionY.toString();
            $scope.posjoy = {
              "left": posXstr + "px",
              "top": posYstr + "px",
              "position": "relative",
              "height": "100px"
            };
          }
        socket.emit('message', ($scope.positionX-200)+','+(-($scope.positionY-200)));
      }

    };


    /*$scope.clickUp = function(event){
     $scope.mouseIsDown = false;
     positionX = 100;
     positionY = 100;
     console.log($scope.mouseIsDown);

     posXstr=positionX.toString();
     posYstr=positionY.toString();

     $scope.posjoy = {
     "left" : posXstr+"px",
     "top" : posYstr+"px",
     "position" : "relative",
     "height" : "100px"
     };
     };*/

  });
