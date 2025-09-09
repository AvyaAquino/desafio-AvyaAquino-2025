export function verificaSubsequencia(sub, main) {
  let ponteiroSub = 0;
  let ponteiroMain = 0;
  while (ponteiroSub < sub.length && ponteiroMain < main.length) {
    if (sub[ponteiroSub] === main[ponteiroMain]) {
      ponteiroSub++;
    }
    ponteiroMain++;
  }
  return ponteiroSub === sub.length;
}
