useDemo(
    ()=>{}, 
    [deps]
);
useDemo(()=>{}, argument2);
useDemo(argument1,[argument2]);
useDemo(argument1,argument2);

f(1, 2);
f(1, [2]);
f(()=>{},[2])

var demo = useDemo(
    ()=>{}, 
    [deps]
);
var demo = useDemo(()=>{}, argument2);
var demo = useDemo(argument1,[argument2]);
var demo = useDemo(argument1,argument2);

var result = f(1, 2);
var result = f(1, [2]);
var result = f(()=>{},[2])
