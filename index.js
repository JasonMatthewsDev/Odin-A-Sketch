
$(document).ready(function(){
	//We call reset to initialize the grid with a default size set
	Reset();
	//Reset the grid when the type of grid is changed
	$('#sl_box_type').change(Reset);
});

function Reset()
{
	//gets the value of the text box for the height and width of our grid
	var boxAmount = $('#txt_amount').val();
	
	//clear the grid and call our draw grid function to draw a new grid
	$('#content').empty();
	
	DrawGrid(boxAmount, $('#content').width());
}

function DrawGrid(boxes, width)
{
	//calculate the size of our boxes taking a 1px padding into account
	var size = (width / boxes) - 1;

	//square our boxes to be drawn (H x W)
	var boxes = boxes * boxes;

	//append the appropriate amount of divs with the class gbox
	for(var x = 0; x < boxes; x++)
	{
		$('#content').append("<div class='gbox'></div>");
	}

	//set all the gbox height and width and add the ChangeColor function 
	//for the mouseenter event listner on our grid boxes
	$('.gbox').height(size).width(size).mouseenter(ChangeColor);
}

function ChangeColor()
{
	//Find the type of grid we're using
	var boxType = $('#sl_box_type').val();
	
	//set some default RGB values for the color Red
	var R = 255;
	var G = 0;
	var B = 0;

	//I'm sure there's a more elegant way to do this but I use some string manipulation to grab
	//the current background color and add 26 which is about 10% of 255 until it's > 255 which is
	//white if the current selection is on fade
	if(boxType === 'fade'){
		//gets the current background color and sets the increment to 26
		var currentBGC = $(this).css('background-color');
		var increment = 26;

		//the string returned for the background color looks like 'rbg(###,###,###)'
		//so we parse it, converting to numbers and adding our increment to the R G
		//and B values to get 10% lighter until the grid box is white
		var start = currentBGC.indexOf('(') + 1;
		var end = currentBGC.indexOf(',');
		R = Number(currentBGC.substring(start, end)) + increment;
		if(R > 255){
			R = 255;
		}

		var start = end + 1;
		var end = currentBGC.indexOf(',', start);
		G = Number(currentBGC.substring(start, end)) + increment;
		if(G > 255){
			G = 255;
		}

		var start = end + 1;
		var end = currentBGC.indexOf(')', start);
		B = Number(currentBGC.substring(start, end)) + increment;
		if(B > 255){
			B = 255;
		}
	//if the selection box is set to random mode we'll just set 3 random values for R G and B
	}else if(boxType === 'random'){
		//set random values for R G B
		R = Math.floor(Math.random() * 255);
		G = Math.floor(Math.random() * 255);
		B = Math.floor(Math.random() * 255);
	}

	//apply the new color to the background of the element that called the function
	$(this).css('background-color', 'rgb(' + R + ',' + G + ',' + B + ')');
}