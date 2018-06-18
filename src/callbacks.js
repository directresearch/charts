export function round(value, decimals) {
  let result = Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

  return result >= 0 ? result : 0;
}

export function lineIntersection(p0, p1, p2, p3) {

  let p0X = p0.x;
  let p0Y = p0.y;
  let p1X = p1.x;
  let p1Y = p1.y;
  let p2X = p2.x;
  let p2Y = p2.y;
  let p3X = p3.x;
  let p3Y = p3.y;
  let s1X, s1Y, s2X, s2Y, s, t;

  s1X = p1X - p0X;
  s1Y = p1Y - p0Y;
  s2X = p3X - p2X;
  s2Y = p3Y - p2Y;

  s = (-s1Y * (p0X - p2X) + s1X * (p0Y - p2Y)) / (-s2X * s1Y + s1X * s2Y);
  t = (s2X * (p0Y - p2Y) - s2Y * (p0X - p2X)) / (-s2X * s1Y + s1X * s2Y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    return [round(p0X + (t * s1X), 2), round(p0Y + (t * s1Y), 2)];
  }
  return false;
}

export function intersections(chart) {

  let points1 = chart.series[0].points; // goedkoop
  let points2 = chart.series[2].points; // duur
  let points3 = chart.series[1].points; // te_goedkoop
  let points4 = chart.series[3].points; // te_duur
  let pointsInterSect1 = chart.series[4]; // IDP
  let pointsInterSect2 = chart.series[5]; // OPS
  let pointsInterSect3 = chart.series[6]; // MGP
  let pointsInterSect4 = chart.series[7]; // MDP
  let i1, intersect1, intersect2, intersect3, intersect4;

  for (i1 = 1; i1 < points1.length; i1++) {
    intersect1 = lineIntersection(points1[i1 - 1], points1[i1], points2[i1 - 1], points2[i1]);
    intersect2 = lineIntersection(points3[i1 - 1], points3[i1], points4[i1 - 1], points4[i1]);
    intersect3 = lineIntersection(points3[i1 - 1], points3[i1], points2[i1 - 1], points2[i1]);
    intersect4 = lineIntersection(points1[i1 - 1], points1[i1], points4[i1 - 1], points4[i1]);

    if (intersect1) {
      pointsInterSect1.addPoint(intersect1, false, false);
    }
    if (intersect2) {
      pointsInterSect2.addPoint(intersect2, false, false);
    }
    if (intersect3) {
      pointsInterSect3.addPoint(intersect3, false, false);
    }
    if (intersect4) {
      pointsInterSect4.addPoint(intersect4, false, false);
    }
  }
  // Functional but disabled for now ;-)
  // addLabelsToIntersection(pointsInterSect1, 'IDP', chart, 30, 35);
  // addLabelsToIntersection(pointsInterSect2, 'OPS', chart, -30, -35);
  // addLabelsToIntersection(pointsInterSect3, 'MGP', chart, 30, 35);
  // addLabelsToIntersection(pointsInterSect4, 'MDP', chart, -30, -35);
  // redraw
  chart.redraw();
}
