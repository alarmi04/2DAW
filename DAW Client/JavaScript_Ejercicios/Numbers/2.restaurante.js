function numerosMenus(menusElegidos, menusSinElegir) {
  alert(
    `De momento llevas ${menusElegidos} menús elegidos...\nTe quedan ${menusSinElegir} por elegir...`
  );
}

let numeroComensales = parseInt(prompt("Introduce el número de comensales: "));

let mayoresDe65 = parseInt(
  prompt("¿Cuántos comensales son mayores de 65 años?")
);
let niños = parseInt(
  prompt("¿Cuántos comensales tenemos menores de 10 años con el menú infantil?")
);

let adultos = numeroComensales - niños;

if (mayoresDe65 > numeroComensales || niños > numeroComensales) {
  alert("No es posible seguir, número de comensales erróneo.");
} else {
  alert(`Estas son las opciones de menú para adultos...
    \n\t1.- Menú del día --> 12,5€
    \n\t2.- Menú del día PREMIUM --> 17,45€
    \n\t3. - Menú Buffet Libre --> 23,85€
    \n\tNOTA: Todos los precios son sin IVA`);
  let menusElegidos = 0;
  let menusSinElegir = adultos;
  numerosMenus(menusElegidos, menusSinElegir);

  let comensalesPrimerMenu = parseInt(
    prompt("¿Cuántos comensales quieren el menú?\n1.- Menú del día --> 12,5€")
  );
  menusElegidos += comensalesPrimerMenu;
  menusSinElegir -= comensalesPrimerMenu;
  numerosMenus(menusElegidos, menusSinElegir);

  let comensalesSegundoMenu = parseInt(
    prompt(
      `¿Cuántos comensales quieren el menú?\n2.- Menú del día PREMIUM --> 17.45€`
    )
  );
  menusElegidos += comensalesSegundoMenu;
  menusSinElegir -= comensalesSegundoMenu;
  numerosMenus(menusElegidos, menusSinElegir);

  let comensalesTercerMenu = menusSinElegir;

  alert(
    `Contamos con un total de ${numeroComensales} comensales: ${niños} niños y ${adultos} adultos
    \nLos menús que se servirán serán los siguientes:
    \n${comensalesPrimerMenu} menú/s del día.
    \n${comensalesSegundoMenu} menú/s PREMIUM y
    \n${comensalesTercerMenu} menú/s Buffet Libre
    \n${niños} menú/s infantil/es.`
  );

  if (mayoresDe65 > 0) {
    alert(`Debe saber que ${mayoresDe65} menú/s se beneficiarán de un 15% de descuento,
        \n\trespecto al menú de adultos por ser mayores de 65
        \n\tNOTA: El descuento será aplicado a los menús más económicos.`);
  }
  if (niños > 0) {
    alert(`Los menús infantiles tienen un precio de 9,25€ + IVA
        \n\tEn su caso, se le aplicará este precio a ${niños} comensales.`);
  }

  let descuentoPrimerMenu = 0;
  let descuentoSegundoMenu = 0;
  let descuentoTercerMenu = 0;
  let descuentoMayores = mayoresDe65;

  if (mayoresDe65 > 0) {
    if (comensalesPrimerMenu > mayoresDe65) {
      descuentoPrimerMenu = mayoresDe65 * 12.5 * 0.15;
    } else {
      descuentoPrimerMenu = comensalesPrimerMenu * 12.5 * 0.15;
      descuentoMayores -= comensalesPrimerMenu;
    }
    if (descuentoMayores > 0) {
      if (comensalesSegundoMenu > descuentoMayores) {
        descuentoSegundoMenu = descuentoMayores * 12.5 * 0.15;
      } else {
        descuentoSegundoMenu = comensalesSegundoMenu * 12.5 * 0.15;
        descuentoMayores -= comensalesSegundoMenu;
      }
      if (comensalesTercerMenu > descuentoMayores) {
        descuentoTercerMenu = descuentoMayores * 23.85 * 0.15;
      }
    }
  }

  console.log(descuentoTercerMenu);
  alert(`Los menú/s que se servirán serán los siguientes:
    \n${comensalesPrimerMenu} menú/s del día x 12,5€.........${parseFloat(
    comensalesPrimerMenu * 12.5 - descuentoPrimerMenu
  ).toFixed(2)}
    \n${comensalesSegundoMenu} menú/s PREMIUM x 17,45€.......${parseFloat(
    comensalesSegundoMenu * 17.45 - descuentoSegundoMenu
  ).toFixed(2)}
    \n${comensalesTercerMenu} menú/s Buffet x 23,85€.........${parseFloat(
    comensalesTercerMenu * 23.85 - descuentoTercerMenu
  )}
    \n${niños} menú/s Intafil/es x 9,25€.....................${
    parseFloat(niños) * 9.25
  }`);
}
