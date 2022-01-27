import { icons } from "./imageRoute"

export const form ={
    line: 'Linea:',
    year: 'Año de la camada:',
    gender:{
        field:'gender',
        data:[
            {value:'macho', image:icons.rooster}, 
            {value:'hembra', image: icons.hen}
        ]
    },
    plaque: 'Numero de placa',
    ring:'Anillo',
    leftLeg:{
        field:'leftLeg',
        data:[
            {value:'adentro', image:icons.in}, 
            {value:'afuera',image:icons.out}, 
            {value:'las dos', image:icons.both}, 
            {value:'ninguna',image:icons.none}
        ]
    },
    rightLeg:{
        field:'rightLeg',
        data:[
            {value:'adentro', image:icons.in}, 
            {value:'afuera',image:icons.out}, 
            {value:'las dos', image:icons.both}, 
            {value:'ninguna',image:icons.none}
        ]
    },
    noise:{
        field:'noise',
        data:[
            {value:'izquierda', image:icons.left}, 
            {value:'derecha',image:icons.right}, 
            {value:'las dos', image:icons.bothNoise}, 
            {value:'ninguna',image:icons.noneNoise}
        ]
    },
   }