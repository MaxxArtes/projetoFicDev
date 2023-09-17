import React, { useEffect } from 'react';
import anychart from 'anychart';

export function Dashboard() {
  useEffect(() => {
    // Código AnyChart para criar e renderizar o gráfico
    anychart.onDocumentLoad(function () {
      var chart = anychart.pie();
      chart.data([
        ["Chocolate", 5],
        ["Rhubarb compote", 2],
        ["Crêpe Suzette", 2],
        ["American blueberry", 2],
        ["Buttermilk", 1]
      ]);
      chart.title("Top 5 pancake fillings");
      chart.container("chart-container"); // Defina o ID do seu contêiner aqui
      chart.draw();
    });
  }, []);

  return (
    <div id="chart-container" style={{ width: '500px', height: '400px' }}>
      {/* O gráfico será renderizado aqui */}
    </div>
  );
}

