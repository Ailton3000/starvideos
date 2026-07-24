// ---------------------------------------------
// Catálogo de amostra — DEMONSTRAÇÃO
// Em produção, isto seria substituído por uma consulta
// a um banco de dados real, com moderação e verificação
// de idade/consentimento antes de qualquer publicação.
// ---------------------------------------------
const CATALOG = [
  { id: '00142', title: 'Arquitetura urbana — centro histórico', category: 'Documentário' },
  { id: '00873', title: 'Receita: pão caseiro passo a passo', category: 'Culinária' },
  { id: '01205', title: 'Trilha na Serra do Mar', category: 'Natureza' },
  { id: '02291', title: 'Tutorial: introdução a CSS Grid', category: 'Educação' },
  { id: '03017', title: 'Show acústico — noite de jazz', category: 'Música' },
  { id: '04521', title: 'Entrevista: futuro das cidades inteligentes', category: 'Tecnologia' },
];

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultBox = document.getElementById('search-result');
const chipsBox = document.getElementById('catalog-chips');
const footerCount = document.getElementById('footer-count');

function pad(id){ return String(id).trim().replace(/\D/g, ''); }

function renderResult(id){
  const clean = pad(id);
  if (!clean){
    resultBox.innerHTML = '';
    return;
  }
  const found = CATALOG.find(v => v.id === clean.padStart(5, '0'));
  if (found){
    resultBox.innerHTML = `
      <div class="found">
        <span class="num">Nº ${found.id}</span> — ${found.title}<br>
        <span style="color: var(--text-dim); font-size:12px;">Categoria: ${found.category}</span>
      </div>
    `;
  } else {
    resultBox.innerHTML = `<span class="not-found">Nenhum vídeo encontrado com o número ${clean}. Tente um dos números de amostra abaixo.</span>`;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  renderResult(input.value);
});

function buildChips(){
  chipsBox.innerHTML = CATALOG.map(v => `<button type="button" data-id="${v.id}">Nº ${v.id}</button>`).join('');
  chipsBox.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.id;
      renderResult(btn.dataset.id);
      input.focus();
    });
  });
}

buildChips();
footerCount.textContent = CATALOG.length;

// ---------------------------------------------
// Painel de administrador
// Proteção simples do lado do cliente — serve apenas
// para uso pessoal, não é um sistema de login seguro.
// Troque 'admin123' pela senha que você quiser usar.
// ---------------------------------------------
const ADMIN_PASSWORD = 'admin123';

const adminGate = document.getElementById('admin-gate');
const adminPanel = document.getElementById('admin-panel');
const adminPass = document.getElementById('admin-pass');
const adminUnlock = document.getElementById('admin-unlock');

adminUnlock.addEventListener('click', () => {
  if (adminPass.value === ADMIN_PASSWORD){
    adminGate.hidden = true;
    adminPanel.hidden = false;
  } else {
    adminPass.value = '';
    adminPass.placeholder = 'Senha incorreta, tente de novo';
  }
});
adminPass.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') adminUnlock.click();
});

const fId = document.getElementById('f-id');
const fTitle = document.getElementById('f-title');
const fType = document.getElementById('f-type');
const fCategory = document.getElementById('f-category');
const fGenerate = document.getElementById('f-generate');
const adminOutput = document.getElementById('admin-output');
const adminCode = document.getElementById('admin-code');
const adminCopy = document.getElementById('admin-copy');

fGenerate.addEventListener('click', () => {
  const id = pad(fId.value).padStart(5, '0');
  const title = (fTitle.value || 'Sem título').replace(/'/g, "\\'");
  const category = (fCategory.value || fType.value).replace(/'/g, "\\'");

  if (!id){
    fId.style.borderColor = 'var(--danger, #E5626B)';
    return;
  }

  const snippet = `  { id: '${id}', title: '${title}', category: '${category}' },`;
  adminCode.value = snippet;
  adminOutput.hidden = false;
});

adminCopy.addEventListener('click', () => {
  adminCode.select();
  document.execCommand('copy');
  adminCopy.textContent = 'Copiado!';
  setTimeout(() => { adminCopy.textContent = 'Copiar código'; }, 1500);
});
