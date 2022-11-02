function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(220);
  const poin1 = [1,2];
  const poin2 = [100,20];
  const poin3 = [10, 200];
  const poin4 = [50,10];
  const poin5 = [300,300];
  const poin6 = [10,10];
  const poin7 = [200,300];
  const poin8 = [250,50];
  dibujadordelineas(1,2,100,20)
  dibujadordelineas(10,200,50,10)
  dibujadordelineas(300,300,10,10)
  dibujadordelineas(200,300,250,50)
  dibujadordelineas(350,350,100,300)
  
  const int_point1 = intersect_point(poin1, poin2, poin3, poin4)
  const int_point2 = intersect_point(poin3, poin4, poin5, poin6)
  const int_point3 = intersect_point(poin5, poin6, poin7, poin8)
  
  ellipseMode(RADIUS);
  ellipse(int_point1[0], int_point1[1], 5);
  ellipse(int_point2[0], int_point2[1], 5);
  ellipse(int_point3[0], int_point3[1], 5);
}

let dibujadordelineas = (x1, y1, x2, y2) => {
    // Variables
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
    // Calcula la diferencia en x || y
    dx = x2 - x1;
    dy = y2 - y1;
    // Delta postitiva (la iteración es más sencilla)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    // Calculo de intervalo de error en los dos axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    // Linea con X-axis dominante
    if (dy1 <= dx1) {
        // Dibujo de izq a der
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Linea de der a izq (swapping)
            x = x2; y = y2; xe = x1;
        }
        point(x, y); // Dibujo de primer pixel
        // Rasterizar linea
        for (i = 0; x < xe; i++) {
            x = x + 1;
            // Octetos
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }
            point(x, y);
            stroke('green')
            strokeWeight(3)
        }
    } else { // Linea con Y-axis dominante
        // Dibujo de abajo a arriba
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Dibujo de arriba a abajo
            x = x2; y = y2; ye = y1;
        }
        point(x, y); // Dibujo de primer pixel
        // Rasterizar la linea
        for (i = 0; y < ye; i++) {
            y = y + 1;
            // Octetos
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }
            point(x, y);
        }
    }
}

function intersect_point(point1, point2, point3, point4) {
   const ua = ((point4[0] - point3[0]) * (point1[1] - point3[1]) - 
             (point4[1] - point3[1]) * (point1[0] - point3[0])) /
            ((point4[1] - point3[1]) * (point2[0] - point1[0]) - 
             (point4[0] - point3[0]) * (point2[1] - point1[1]));
  
  const ub = ((point2[0] - point1[0]) * (point1[1] - point3[1]) - 
             (point2[1] - point1[1]) * (point1[0] - point3[0])) /
            ((point4[1] - point3[1]) * (point2[0] - point1[0]) - 
             (point4[0] - point3[0]) * (point2[1] - point1[1]));
  
  const x = point1[0] + ua * (point2[0] - point1[0]);
  const y = point1[1] + ua * (point2[1] - point1[1]);
  
  return [x, y]
}

// Referencia: https://ghost-together.medium.com/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395



