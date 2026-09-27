# Sítio Cerejeira — reconstrução do site

Esta base foi reconstruída a partir do site público `https://sitio-cerejeira.vercel.app/` em 27/09/2026. Ela **não é** o repositório original. Os arquivos de mídia pública foram recuperados do próprio site. Os ZIPs enviados pelo usuário foram usados apenas para comparação e não são publicados no repositório.

## Executar

```powershell
npm run check
npm run build
npm run preview
```

A prévia fica em `http://localhost:4173/`. O build estático fica em `dist/`. `vercel.json` configura o build e o diretório de saída para uma futura conexão do repositório ao projeto Vercel correto.

## O que foi revisado

- Os três contatos levam ao WhatsApp confirmado pelo usuário, com a mesma mensagem sobre a propriedade.
- O botão fixo de contato foi removido. Os vídeos têm reprodução silenciosa e os arquivos MP4 publicados não possuem faixa de áudio.
- A galeria permite abrir fotos, avançar, voltar e fechar por teclado. O layout foi conferido em desktop e celular.
- As fotos públicas foram comparadas às originais. Os arquivos editados do ZIP são peças de redes sociais; nenhuma substituição mostrou ganho claro para a página. A seleção publicada foi preservada.

## Pendências para publicação

- Validar os campos concretos do formulário instantâneo da Meta e atualizar a Política de Privacidade. A rota está em `src/politica-de-privacidade/index.html`, marcada como rascunho e `noindex` até a revisão final.
- Confirmar acesso ao projeto Vercel que controla `sitio-cerejeira.vercel.app`. Criar outro projeto sem esse acesso não atualizará o endereço atual.
- Não instalar GTM ou pixel antes de conhecer as tags e finalidades reais. O código desta reconstrução não inclui rastreamento.
