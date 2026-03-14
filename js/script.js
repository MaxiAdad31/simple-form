function toggleBloque(n) {
  const body = document.getElementById('body'+n);
  const chev = document.getElementById('chev'+n);
  const hdr  = document.querySelector('#b'+n+' .bloque-header');
  const abierto = body.classList.contains('visible');
  body.classList.toggle('visible', !abierto);
  chev.classList.toggle('girado', !abierto);
  hdr.classList.toggle('abierto', !abierto);
  hdr.classList.toggle('cerrado', abierto);
}

function abrirTodo() {
  [1,2,3,4,5,6].forEach(n => {
    document.getElementById('body'+n).classList.add('visible');
    document.getElementById('chev'+n).classList.add('girado');
    const hdr = document.querySelector('#b'+n+' .bloque-header');
    hdr.classList.add('abierto');
    hdr.classList.remove('cerrado');
  });
}

function toggleOpcion(btn, grupo) {
  const opts = document.querySelectorAll('#'+grupo+' .opcion-btn');
  const ya = btn.classList.contains('seleccionado');
  opts.forEach(o => o.classList.remove('seleccionado'));
  if (!ya) btn.classList.add('seleccionado');
  actualizarProgreso();
}

function getTA(id) { const e = document.getElementById(id); return e ? e.value.trim() : ''; }
function getOp(id) { const s = document.querySelector('#'+id+' .seleccionado'); return s ? s.textContent : ''; }

function actualizarProgreso() {
  const textos = ['q1_1','q1_2','q1_3','q1_5','q2_1','q2_2','q2_3','q2_4','q2_5',
    'q3_1','q3_2','q3_3','q3_4','q4_1','q4_2','q4_3','q4_4','q5_1','q5_2','q5_3','q5_4','q6_1','q6_3','q6_4'];
  const opciones = ['q1_4','q1_6','q3_5','q6_2','q6_5'];
  let total = textos.length + opciones.length, rellenos = 0;
  textos.forEach(id => { if(getTA(id).length > 3) rellenos++; });
  opciones.forEach(id => { if(getOp(id)) rellenos++; });
  const pct = Math.round((rellenos / total) * 100);
  document.getElementById('prog-fill').style.width = pct+'%';
  document.getElementById('prog-pct').textContent = pct+'% completado';
  document.getElementById('prog-texto').textContent = rellenos+' de '+total+' preguntas respondidas';
}

function verResumen() {
  abrirTodo();
  const secciones = [
    { titulo: '🏪 El negocio hoy', items: [
      getTA('q1_1') && 'Horario y equipo: '+getTA('q1_1'),
      getTA('q1_2') && 'Productos estrella: '+getTA('q1_2'),
      getTA('q1_3') && 'Proveedores: '+getTA('q1_3'),
      getOp('q1_4') && 'Tipo de clientes: '+getOp('q1_4'),
      getTA('q1_5') && 'Días movidos: '+getTA('q1_5'),
      getOp('q1_6') && 'Merma semanal: '+getOp('q1_6'),
    ].filter(Boolean)},
    { titulo: '🌦️ Clima y estaciones', items: [
      getTA('q2_1') && 'Mejor época: '+getTA('q2_1'),
      getTA('q2_2') && 'Efecto del clima: '+getTA('q2_2'),
      getTA('q2_3') && 'Productos estacionales: '+getTA('q2_3'),
      getTA('q2_4') && 'Temporada sorpresa: '+getTA('q2_4'),
      getTA('q2_5') && 'Preparación temporada baja: '+getTA('q2_5'),
    ].filter(Boolean)},
    { titulo: '🤝 Los clientes', items: [
      getTA('q3_1') && 'Por qué te eligen: '+getTA('q3_1'),
      getTA('q3_2') && 'Clientes históricos: '+getTA('q3_2'),
      getTA('q3_3') && 'Qué falta: '+getTA('q3_3'),
      getTA('q3_4') && 'Cambio en el perfil: '+getTA('q3_4'),
      getOp('q3_5') && 'Uso del celular: '+getOp('q3_5'),
    ].filter(Boolean)},
    { titulo: '⚡ Momentos clave', items: [
      getTA('q4_1') && 'Mejores fechas: '+getTA('q4_1'),
      getTA('q4_2') && 'Fechas flojas: '+getTA('q4_2'),
      getTA('q4_3') && 'Momentos de crisis: '+getTA('q4_3'),
      getTA('q4_4') && 'Productos sorpresa: '+getTA('q4_4'),
    ].filter(Boolean)},
    { titulo: '🤲 Colegas y mercado', items: [
      getTA('q5_1') && 'Relación con colegas: '+getTA('q5_1'),
      getTA('q5_2') && 'Límites que no se cruzan: '+getTA('q5_2'),
      getTA('q5_3') && 'Cómo cambió el mercado: '+getTA('q5_3'),
      getTA('q5_4') && 'Qué podría mejorar: '+getTA('q5_4'),
    ].filter(Boolean)},
    { titulo: '💡 Visión del futuro', items: [
      getTA('q6_1') && 'Objetivo a 2 años: '+getTA('q6_1'),
      getOp('q6_2') && 'Mayor preocupación: '+getOp('q6_2'),
      getTA('q6_3') && 'Secreto del éxito: '+getTA('q6_3'),
      getTA('q6_4') && 'Lo que siempre quiso hacer: '+getTA('q6_4'),
      getOp('q6_5') && 'Sucesión familiar: '+getOp('q6_5'),
    ].filter(Boolean)},
  ];

  let html = '';
  secciones.forEach(s => {
    if (!s.items.length) return;
    html += '<div class="resumen-seccion">';
    html += '<div class="resumen-titulo">'+s.titulo+'</div>';
    s.items.forEach(it => {
      html += '<div class="resumen-item">▸ '+it+'</div>';
    });
    html += '</div>';
  });

  if (!html) html = '<p style="font-size:13px;color:#1B4332;">Todavía no hay respuestas registradas. Completá al menos algunas secciones antes de ver el resumen.</p>';

  document.getElementById('resumen-contenido').innerHTML = html;
  document.getElementById('resultado').style.display = 'block';
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
}

function copiarResumen() {
  const secciones = [
    { titulo: 'EL NEGOCIO HOY', items: [
      getTA('q1_1') && 'Horario y equipo: '+getTA('q1_1'),
      getTA('q1_2') && 'Productos estrella: '+getTA('q1_2'),
      getTA('q1_3') && 'Proveedores: '+getTA('q1_3'),
      getOp('q1_4') && 'Tipo de clientes: '+getOp('q1_4'),
      getTA('q1_5') && 'Días movidos: '+getTA('q1_5'),
      getOp('q1_6') && 'Merma semanal: '+getOp('q1_6'),
    ].filter(Boolean)},
    { titulo: 'CLIMA Y ESTACIONES', items: [
      getTA('q2_1') && 'Mejor época: '+getTA('q2_1'),
      getTA('q2_2') && 'Efecto del clima: '+getTA('q2_2'),
      getTA('q2_3') && 'Productos estacionales: '+getTA('q2_3'),
      getTA('q2_4') && 'Temporada sorpresa: '+getTA('q2_4'),
      getTA('q2_5') && 'Preparación temporada baja: '+getTA('q2_5'),
    ].filter(Boolean)},
    { titulo: 'LOS CLIENTES', items: [
      getTA('q3_1') && 'Por qué te eligen: '+getTA('q3_1'),
      getTA('q3_2') && 'Clientes históricos: '+getTA('q3_2'),
      getTA('q3_3') && 'Qué falta: '+getTA('q3_3'),
      getTA('q3_4') && 'Cambio en el perfil: '+getTA('q3_4'),
      getOp('q3_5') && 'Uso del celular: '+getOp('q3_5'),
    ].filter(Boolean)},
    { titulo: 'MOMENTOS CLAVE', items: [
      getTA('q4_1') && 'Mejores fechas: '+getTA('q4_1'),
      getTA('q4_2') && 'Fechas flojas: '+getTA('q4_2'),
      getTA('q4_3') && 'Momentos de crisis: '+getTA('q4_3'),
      getTA('q4_4') && 'Productos sorpresa: '+getTA('q4_4'),
    ].filter(Boolean)},
    { titulo: 'COLEGAS Y MERCADO', items: [
      getTA('q5_1') && 'Relación con colegas: '+getTA('q5_1'),
      getTA('q5_2') && 'Límites que no se cruzan: '+getTA('q5_2'),
      getTA('q5_3') && 'Cómo cambió el mercado: '+getTA('q5_3'),
      getTA('q5_4') && 'Qué podría mejorar: '+getTA('q5_4'),
    ].filter(Boolean)},
    { titulo: 'VISION DEL FUTURO', items: [
      getTA('q6_1') && 'Objetivo a 2 años: '+getTA('q6_1'),
      getOp('q6_2') && 'Mayor preocupación: '+getOp('q6_2'),
      getTA('q6_3') && 'Secreto del éxito: '+getTA('q6_3'),
      getTA('q6_4') && 'Lo que siempre quiso hacer: '+getTA('q6_4'),
      getOp('q6_5') && 'Sucesión familiar: '+getOp('q6_5'),
    ].filter(Boolean)},
  ];

  let texto = 'CUESTIONARIO DEL PUESTERO — MERCADO DE ABASTO, CÓRDOBA\n';
  texto += '='.repeat(55) + '\n\n';
  secciones.forEach(s => {
    if (!s.items.length) return;
    texto += s.titulo + '\n' + '-'.repeat(30) + '\n';
    s.items.forEach(it => { texto += '• ' + it + '\n'; });
    texto += '\n';
  });

  navigator.clipboard.writeText(texto).then(() => {
    alert('¡Respuestas copiadas! Podés pegarlas en un mensaje o documento.');
  }).catch(() => {
    alert('No se pudo copiar automáticamente. Usá el botón de imprimir para guardar el formulario.');
  });
}