const unusedVariable = "I'm not used anywhere!";
var unusedFunction = function() {
    console.log("I'm not used anywhere!");
};

  console.log("Hello")

const x = 1 as any,
  y = 1 as any;
const [x] = 1 as any;

if ([] == false) {
  console.log("This will log because of type coercion");
}

export * from "@/config";
