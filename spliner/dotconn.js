document.addEventListener("DOMContentLoaded",()=>{
	const c = document.getElementById("playground");
    const ctx = c.getContext("2d");
	ctx.fillStyle="#ff0000";
	ctx.strokeStyle="#ff0000";
	out=document.getElementById("out");
    var curves = []
	var cur_curve = []
	var img = new Image();
	img.src="image.png";
	img.onload = ()=>{
		draw();
	};
	var clear=()=>{
		ctx.clearRect(0,0,c.width,c.height);
    };
	var draw=()=>{
		clear();
		ctx.drawImage(img,0,0);
		var txt=""
		for (var i=0;i<curves.length;i++){
			ctx.beginPath();
			ctx.moveTo(curves[i][0][0],curves[i][0][1]);
			ctx.bezierCurveTo(curves[i][1][0],curves[i][1][1],curves[i][2][0],curves[i][2][1],curves[i][3][0],curves[i][3][1]);
			ctx.stroke();
			txt+="bezier<br>"+[].concat.apply([], curves[i]).join(" ")+"<br>"
		}
		out.innerHTML=txt;
		for (var i =0;i<cur_curve.length;i++) {
			console.log(cur_curve[i]);
			ctx.beginPath();
			ctx.ellipse(cur_curve[i][0],cur_curve[i][1],3,3,0,0,2*Math.PI); 
			ctx.fill();
		}
	};
	document.getElementById("clear").addEventListener("click",()=>{curves=[];cur_curve=[];draw();});
	document.getElementById("undo").addEventListener("click",()=>{
		curves.splice(curves.length-1);
		draw();
	});
    c.addEventListener("click",(e)=>{
		cur_curve[cur_curve.length]=[e.offsetX,e.offsetY];
		console.log(cur_curve);
		if (cur_curve.length===4) {
			curves[curves.length]=cur_curve;
			cur_curve=[];
		}
		draw();
    });
});
