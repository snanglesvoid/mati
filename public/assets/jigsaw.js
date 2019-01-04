snapfit.defaultMixed        = true; //BOOLEAN mix pieces at startup
snapfit.defaultSimple       = false; //BOOLEAN mix the positions only
snapfit.defaultNokeys       = false; //BOOLEAN no keyboard control
snapfit.defaultTofront      = true; //BOOLEAN on snap automatically set all pieces behind the current to front
snapfit.defaultPolygon      = true; //BOOLEAN polygons instead of rectangles
snapfit.defaultLevel        = 2; //INT 0-6 (0==simple and 6==difficult)
snapfit.defaultSpace        = 0; //INT 0-50 (%) inner frame space
snapfit.defaultSnap         = 8; //INT 0-24 (px) snap radius
snapfit.defaultCallback     = function () {
    alert('congrats')
}; //JS function(){ ... } call on manual solving
snapfit.defaultMatchcolor   = '#00d000'; //STR '#000000'-'#ffffff'
snapfit.defaultFalsecolor   = '#ff0000'; //STR '#000000'-'#ffffff'
snapfit.defaultAreacolor    = '#e0e0e0'; //STR '#000000'-'#ffffff'
snapfit.defaultBgrndcolor   = '#000000'; //STR '#000000'-'#ffffff'
snapfit.defaultAreaimage    = false; //BOOLEAN image as background
snapfit.defaultAreaborder   = false; //BOOLEAN background border
snapfit.defaultBorderwide   = 2; //INT/FLOAT 1.0-6.0 (px) pieces border width
snapfit.defaultAreaopacity  = 0.33; //FLOAT 0.0-1.0 background area/image opacity
snapfit.defaultBorderopacity= 0.5; //FLOAT 0.0-1.0 pieces border/backside opacity
snapfit.defaultShadowopacity= 0.75; //FLOAT 0.0-1.0 active piece shadow opacity
snapfit.defaultForcetouchui = true; //BOOLEAN forces touch UI over the mouse UI if both available