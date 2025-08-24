async function __qbjs_run() {
/* global constants: */ const ScreenWidth  =    640; const ScreenHeight  =    480; const ScoreboardHeight  =    40; const BottomY  =    460; const DangerZone  =    BottomY -  100; const KeyW  =    40; const KeyH  =    30; const LetterFallSpeed  =    0.5; const LaserSpeed  =    10; const ExplosionFrames  =    12; 
/* shared variables: */ 
/* static method variables: */ 
async function main() {
QB.start(); QB.setTypeMap({ GXPOSITION:[{ name: 'x', type: 'LONG' }, { name: 'y', type: 'LONG' }], GXDEVICEINPUT:[{ name: 'deviceId', type: 'INTEGER' }, { name: 'deviceType', type: 'INTEGER' }, { name: 'inputType', type: 'INTEGER' }, { name: 'inputId', type: 'INTEGER' }, { name: 'inputValue', type: 'INTEGER' }], FETCHRESPONSE:[{ name: 'ok', type: 'INTEGER' }, { name: 'status', type: 'INTEGER' }, { name: 'statusText', type: 'STRING' }, { name: 'text', type: 'STRING' }]});
    await GX.registerGameEvents(function(e){});
    QB.sub_Screen(0);

/* implicit variables: */ var r = 0;  /* INTEGER */ var rowLen = 0;  /* INTEGER */ var rowWidth = 0;  /* INTEGER */ var startX = 0;  /* INTEGER */ var c = 0;  /* INTEGER */ var ch = '';  /* STRING */ var idx = 0;  /* INTEGER */ var i = 0;  /* INTEGER */ var exitGame = 0;  /* INTEGER */ var k = 0;  /* INTEGER */ var activeCount = 0;  /* INTEGER */ var key = '';  /* STRING */ var mx = 0;  /* LONG */ var my = 0;  /* LONG */ var bestI = 0;  /* INTEGER */ var bestY = 0;  /* INTEGER */ var rad = 0;  /* INTEGER */ 
   QB.sub_Screen( (QB.func__NewImage(  640 ,    480 ,    32)));
   QB.sub_Randomize(false, QB.func_Timer())
   var Hits = 0;  /* LONG */ var Missed = 0;  /* LONG */ 
   var Letter = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var LetterX = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var LetterY = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var LetterActive = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ 
   var LaserX = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var LaserY = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var LaserActive = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ 
   var ExplosionX = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var ExplosionY = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ var ExplosionTimer = QB.initArray([{l:0,u:100}], 0);  /* SINGLE */ 
   var KeyChar = QB.initArray([{l:0,u:26}], 0);  /* SINGLE */ var KeyX = QB.initArray([{l:0,u:26}], 0);  /* SINGLE */ var KeyY = QB.initArray([{l:0,u:26}], 0);  /* SINGLE */ var KeyWArr = QB.initArray([{l:0,u:26}], 0);  /* SINGLE */ var KeyHArr = QB.initArray([{l:0,u:26}], 0);  /* SINGLE */ 
   var rowStr = QB.initArray([{l:0,u:2}], 0);  /* SINGLE */ 
   QB.arrayValue(rowStr, [ 0]).value = "QWERTYUIOP";
   QB.arrayValue(rowStr, [ 1]).value = "ASDFGHJKL";
   QB.arrayValue(rowStr, [ 2]).value = "ZXCVBNM";
   var rowY = QB.initArray([{l:0,u:2}], 0);  /* SINGLE */ 
   QB.arrayValue(rowY, [ 0]).value =  360;
   QB.arrayValue(rowY, [ 1]).value =  400;
   QB.arrayValue(rowY, [ 2]).value =  440;
   var keySpacing = 0;  /* INTEGER */ 
   var ___v5334240 = 0; ___l7055475: for ( r=  0 ;  r <=  2;  r= r + 1) { if (QB.halted()) { return; } ___v5334240++;   if (___v5334240 % 100 == 0) { await QB.autoLimit(); }
      rowLen = (QB.func_Len( QB.arrayValue(rowStr, [ r]).value));
      if ( r ==   2 ) {
         rowWidth =  rowLen *  KeyW + ( rowLen -  1)  *  5;
         startX =  QB.func_Fix(QB.func_Cint(( ScreenWidth -  rowWidth)  ) / QB.func_Cint(   2));
         keySpacing =  5;
      } else {
         keySpacing =  QB.func_Fix(QB.func_Cint(( ScreenWidth - ( rowLen *  KeyW))  ) / QB.func_Cint(  ( rowLen +  1)));
         startX =  keySpacing;
      }
      var ___v2895625 = 0; ___l5795186: for ( c=  1 ;  c <=  rowLen;  c= c + 1) { if (QB.halted()) { return; } ___v2895625++;   if (___v2895625 % 100 == 0) { await QB.autoLimit(); }
         ch = (QB.func_Mid( QB.arrayValue(rowStr, [ r]).value  ,    c,    1));
         idx = (QB.func_Asc(  ch))  -  64;
         QB.arrayValue(KeyChar, [ idx]).value =  ch;
         QB.arrayValue(KeyX, [ idx]).value =  startX + ( c -  1)  * ( KeyW +  keySpacing);
         QB.arrayValue(KeyY, [ idx]).value = QB.arrayValue(rowY, [ r]).value;
         QB.arrayValue(KeyWArr, [ idx]).value =  KeyW;
         QB.arrayValue(KeyHArr, [ idx]).value =  KeyH;
      } 
   } 
   var ___v7747401 = 0; ___l3019480: for ( i=  1 ;  i <=  10;  i= i + 1) { if (QB.halted()) { return; } ___v7747401++;   if (___v7747401 % 100 == 0) { await QB.autoLimit(); }
      QB.arrayValue(LetterActive, [ i]).value =  0;
   } 
   exitGame =  0;
   var ___v7607236 = 0; ___l140176: do { if (QB.halted()) { return; }___v7607236++;   if (___v7607236 % 100 == 0) { await QB.autoLimit(); }
      QB.sub_Line(false,  0 ,   ScoreboardHeight, false,  ScreenWidth ,   ScreenHeight,   (QB.func__RGB32(  0 ,    0 ,    0))  , 'BF', undefined);
      QB.sub_Color( (QB.func__RGB32(  0 ,    255 ,    0)));
      QB.sub__PrintString( 10 ,   10,   "HITS: "  + (QB.func_LTrim( (QB.func_Str(  Hits)))));
      QB.sub_Color( (QB.func__RGB32(  255 ,    80 ,    80)));
      QB.sub__PrintString( 150 ,   10,   "MISSED: "  + (QB.func_LTrim( (QB.func_Str(  Missed)))));
      var ___v7090379 = 0; ___l8144900: for ( k=  1 ;  k <=  26;  k= k + 1) { if (QB.halted()) { return; } ___v7090379++;   if (___v7090379 % 100 == 0) { await QB.autoLimit(); }
         if (QB.arrayValue(KeyWArr, [ k]).value  > 0 ) {
            QB.sub_Line(false, QB.arrayValue(KeyX, [ k]).value  ,  QB.arrayValue(KeyY, [ k]).value, false, QB.arrayValue(KeyX, [ k]).value  + QB.arrayValue(KeyWArr, [ k]).value  ,  QB.arrayValue(KeyY, [ k]).value  + QB.arrayValue(KeyHArr, [ k]).value,   (QB.func__RGB32(  200 ,    200 ,    200))  , 'B', undefined);
            QB.sub_Color( (QB.func__RGB32(  255 ,    220 ,    0)));
            QB.sub__PrintString(QB.arrayValue(KeyX, [ k]).value  +  12 ,  QB.arrayValue(KeyY, [ k]).value  +  8,   QB.arrayValue(KeyChar, [ k]).value);
            QB.sub__PrintString(QB.arrayValue(KeyX, [ k]).value  +  13 ,  QB.arrayValue(KeyY, [ k]).value  +  8,   QB.arrayValue(KeyChar, [ k]).value);
         }
      } 
      activeCount =  0;
      var ___v4140327 = 0; ___l453528: for ( i=  1 ;  i <=  100;  i= i + 1) { if (QB.halted()) { return; } ___v4140327++;   if (___v4140327 % 100 == 0) { await QB.autoLimit(); }
         if (QB.arrayValue(LetterActive, [ i]).value  ) {
            activeCount =  activeCount +  1;
         }
      }
      if ( activeCount < 10 ) {
         var ___v7904800 = 0; ___l8626193: for ( i=  1 ;  i <=  100;  i= i + 1) { if (QB.halted()) { return; } ___v7904800++;   if (___v7904800 % 100 == 0) { await QB.autoLimit(); }
            if (QB.arrayValue(LetterActive, [ i]).value  ==   0 ) {
               QB.arrayValue(LetterActive, [ i]).value =  - 1;
               QB.arrayValue(Letter, [ i]).value = (QB.func_Chr(  65 + (QB.func_Int( QB.func_Rnd() *  26))));
               QB.arrayValue(LetterX, [ i]).value =  20 + (QB.func_Int( QB.func_Rnd() * ( ScreenWidth -  40)));
               QB.arrayValue(LetterY, [ i]).value =  ScoreboardHeight;
               break ___l8626193;
            }
         }
      }
      var ___v9619532 = 0; ___l3735362: for ( i=  1 ;  i <=  100;  i= i + 1) { if (QB.halted()) { return; } ___v9619532++;   if (___v9619532 % 100 == 0) { await QB.autoLimit(); }
         if (QB.arrayValue(LetterActive, [ i]).value  ) {
            if (QB.arrayValue(LetterY, [ i]).value  >=  BottomY) {
               QB.sub_Color( (QB.func__RGB32(  255 ,    0 ,    0)));
            } else if (QB.arrayValue(LetterY, [ i]).value  >=  DangerZone) {
               QB.sub_Color( (QB.func__RGB32(  255 ,    0 ,    255)));
            } else {
               QB.sub_Color( (QB.func__RGB32(  255 ,    255 ,    255)));
            }
            QB.sub__PrintString(QB.arrayValue(LetterX, [ i]).value  ,  QB.arrayValue(LetterY, [ i]).value,   QB.arrayValue(Letter, [ i]).value);
            QB.arrayValue(LetterY, [ i]).value = QB.arrayValue(LetterY, [ i]).value  +  LetterFallSpeed;
            if (QB.arrayValue(LetterY, [ i]).value  > BottomY + QB.arrayValue(KeyHArr, [ 2]).value  ) {
               QB.arrayValue(LetterActive, [ i]).value =  0;
               Missed =  Missed +  1;
            }
         }
      } 
      key = QB.func_InKey();
      if ( key ==  (QB.func_Chr(  27))  ) {
         exitGame =  -  1;
      }
      if ( key ==  ""  ) {
         var ___v562369 = 0; ___l8714458: while (QB.func__MouseInput()) { if (QB.halted()) { return; }___v562369++;   if (___v562369 % 100 == 0) { await QB.autoLimit(); }
            if ((QB.func__MouseButton(  1))  ) {
               mx = QB.func__MouseX();
               my = QB.func__MouseY();
               var ___v3640187 = 0; ___l9495566: for ( k=  1 ;  k <=  26;  k= k + 1) { if (QB.halted()) { return; } ___v3640187++;   if (___v3640187 % 100 == 0) { await QB.autoLimit(); }
                  if (QB.arrayValue(KeyWArr, [ k]).value  > 0 ) {
                     if ( mx >= QB.arrayValue(KeyX, [ k]).value  &  mx <= QB.arrayValue(KeyX, [ k]).value  + QB.arrayValue(KeyWArr, [ k]).value  &  my >= QB.arrayValue(KeyY, [ k]).value  &  my <= QB.arrayValue(KeyY, [ k]).value  + QB.arrayValue(KeyHArr, [ k]).value  ) {
                        key = QB.arrayValue(KeyChar, [ k]).value;
                        break ___l9495566;
                     }
                  }
               } 
            }
         }
      }
      if ( key !=  ""  ) {
         key = (QB.func_UCase(  key));
         bestI =  0;
         bestY =  - 1;
         var ___v7671117 = 0; ___l5248684: for ( i=  1 ;  i <=  100;  i= i + 1) { if (QB.halted()) { return; } ___v7671117++;   if (___v7671117 % 100 == 0) { await QB.autoLimit(); }
            if (QB.arrayValue(LetterActive, [ i]).value  ) {
               if (QB.arrayValue(Letter, [ i]).value  ==   key) {
                  if (QB.arrayValue(LetterY, [ i]).value  > bestY) {
                     bestY = QB.arrayValue(LetterY, [ i]).value;
                     bestI =  i;
                  }
               }
            }
         }
         if ( bestI > 0 ) {
            QB.arrayValue(LetterActive, [ bestI]).value =  0;
            Hits =  Hits +  1;
            QB.arrayValue(LaserActive, [ bestI]).value =  - 1;
            QB.arrayValue(LaserX, [ bestI]).value = QB.arrayValue(LetterX, [ bestI]).value;
            QB.arrayValue(LaserY, [ bestI]).value =  BottomY;
            QB.arrayValue(ExplosionX, [ bestI]).value = QB.arrayValue(LetterX, [ bestI]).value;
            QB.arrayValue(ExplosionY, [ bestI]).value = QB.arrayValue(LetterY, [ bestI]).value;
            QB.arrayValue(ExplosionTimer, [ bestI]).value =  ExplosionFrames;
            await QB.sub_Sound(  600 ,    0.15);
         }
      }
      var ___v5924582 = 0; ___l535045: for ( i=  1 ;  i <=  100;  i= i + 1) { if (QB.halted()) { return; } ___v5924582++;   if (___v5924582 % 100 == 0) { await QB.autoLimit(); }
         if (QB.arrayValue(LaserActive, [ i]).value  ) {
            QB.sub_Line(false, QB.arrayValue(LaserX, [ i]).value  ,  QB.arrayValue(LaserY, [ i]).value, false, QB.arrayValue(LaserX, [ i]).value  ,  QB.arrayValue(LaserY, [ i]).value  -  12,   (QB.func__RGB32(  255 ,    0 ,    255)), undefined, undefined);
            QB.arrayValue(LaserY, [ i]).value = QB.arrayValue(LaserY, [ i]).value  -  LaserSpeed;
            if (QB.arrayValue(LaserY, [ i]).value  < ScoreboardHeight) {
               QB.arrayValue(LaserActive, [ i]).value =  0;
            }
         }
      } 
      var ___v2981654 = 0; ___l4687001: for ( i=  1 ;  i <=  100;  i= i + 1) { if (QB.halted()) { return; } ___v2981654++;   if (___v2981654 % 100 == 0) { await QB.autoLimit(); }
         if (QB.arrayValue(ExplosionTimer, [ i]).value  > 0 ) {
            rad =  6 + ( ExplosionFrames - QB.arrayValue(ExplosionTimer, [ i]).value);
            QB.sub_Circle(false, QB.arrayValue(ExplosionX, [ i]).value  ,  QB.arrayValue(ExplosionY, [ i]).value,    rad ,  (QB.func__RGB32(  255 ,    255 ,    0)));
            QB.arrayValue(ExplosionTimer, [ i]).value = QB.arrayValue(ExplosionTimer, [ i]).value  -  1;
         }
      } 
      QB.sub__Display();
      await QB.sub__Limit(  60);
   } while (!( exitGame))
QB.end();
} await main();


}