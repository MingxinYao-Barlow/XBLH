
// === Navigation ===
(function() {
  const nav = document.getElementById('mainNav');
  const modules = document.querySelectorAll('.module');

  function switchModule(id) {
    modules.forEach(m => m.classList.remove('active'));
    var target = document.getElementById('module-' + id);
    if (target) target.classList.add('active');
    nav.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
    var btn = nav.querySelector('[data-module="' + id + '"]');
    if (btn) btn.classList.add('active');
    // Charts are on home page now - init on home module
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nav.addEventListener('click', function(e) {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;
    switchModule(btn.dataset.module);
  });

  document.addEventListener('click', function(e) {
    const go = e.target.closest('.go-btn');
    if (!go) return;
    switchModule(go.dataset.module);
  });

  // Business sub-tabs
  document.querySelector('#module-business').addEventListener('click', function(e) {
    const btn = e.target.closest('.subtab-btn');
    if (!btn) return;
    const container = btn.closest('.module');
    container.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    container.querySelectorAll('.subtab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('subtab-' + btn.dataset.subtab);
    if (panel) panel.classList.add('active');
  });

  window.switchModule = switchModule;
})();

//


  if (localStorage.getItem('nltc_goto')) {
    var goto = localStorage.getItem('nltc_goto');
    localStorage.removeItem('nltc_goto');
    if (goto === 'business') window.switchModule('business');
  }

// === Pagination Helper ===
function renderPagination(containerId, currentPage, totalPages, onPage) {
  const c = document.getElementById(containerId);
  if (totalPages <= 1) { c.innerHTML = ''; return; }
  let html = '';
  html += '<button ' + (currentPage === 1 ? 'disabled' : '') + ' data-page="' + (currentPage - 1) + '">上一页</button>';
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  if (start > 1) html += '<button data-page="1">1</button><span style="padding:6px">...</span>';
  for (let i = start; i <= end; i++) {
    html += '<button data-page="' + i + '"' + (i === currentPage ? ' class="active"' : '') + '>' + i + '</button>';
  }
  if (end < totalPages) html += '<span style="padding:6px">...</span><button data-page="' + totalPages + '">' + totalPages + '</button>';
  html += '<button ' + (currentPage === totalPages ? 'disabled' : '') + ' data-page="' + (currentPage + 1) + '">下一页</button>';
  c.innerHTML = html;
  c.querySelectorAll('button:not([disabled])').forEach(b => {
    b.addEventListener('click', function() { onPage(parseInt(this.dataset.page)); });
  });
}

// ============ DATA ============

// --- Literature Data ---
var litData = [
  { title: '金融支持西部陆海新通道建设工作会议在渝召开 袁家军出席并讲话 潘功胜讲话 陆海新通道金融服务中心揭牌', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202602/t20260205_15384977.html' },
  { title: '414列→1911列！团结村中心站开行中欧班列十年增长约3.6倍', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202606/t20260618_15765049.html' },
  { title: '万州大潮涌平湖 乘势开新局 奋力推动重庆重要城市副中心建设走深走实、成势见效', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202606/t20260616_15756146.html' },
  { title: '从中国提案到联合国公约 重庆作为策源地，积极探索实践更有包容性的国际运输规则', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202606/t20260601_15716663.html' },
  { title: '西部陆海新通道新增专业化综合服务平台 重庆市陆海经贸促进中心授牌', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260526_15702594.html' },
  { title: '一季度出口额同比增长35.9% 巴渝土特产出海为何能逆势增长', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260518_15681395.html' },
  { title: '重庆綦江：通道破内向 开放产业兴', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260509_15664288.html' },
  { title: '统筹铁公水空 畅通东南西北 重庆点线面织就一张全球物流网', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260509_15661170.html' },
  { title: '今年一季度重庆农产品出口增长35.9%', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260509_15661168.html' },
  { title: '铁海联运运输量稳居全市第一 千亿级产业集群加速成型 外贸进出口近100亿元 重庆枢纽港产业园两年跃三级', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260507_15654180.html' },
  { title: '陆海新通道为进口水果提供一站式服务 1—4月从老挝进口香蕉310标箱 同比增长370%', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202605/t20260507_15654178.html' },
  { title: '服务西部陆海新通道建设 今年一季度重庆国企进出口额达268亿元', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202604/t20260428_15640964.html' },
  { title: '西部陆海新通道跨境公路班车开行量创新高', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202604/t20260423_15630233.html' },
  { title: '运费优惠30% 重庆造三轮车零部件高效出口印尼', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://www.cq.gov.cn/zt/xblhxtd/rdxw/202604/t20260420_15623901.html' },
  { title: '中国人民银行 国家发展改革委 财政部 交通运输部 商务部 金融监管总局 中国证监会 国家外汇局 联合发布《关于金融支持加快西部陆海新通道建设的意见》', country: '中国', lang: '中文', category: '经贸政策', year: 2025, url: 'https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2025122410475061179/index.html' },
  { title: '国家发展改革委《十四五推进西部陆海新通道高质量建设实施方案》', country: '中国', lang: '中文', category: '经贸政策', year: 2021, url: 'https://www.gov.cn/zhengce/zhengceku/2021-09/02/content_5634939.htm' },
  { title: '海关总署推出15条重点举措更好支持西部陆海新通道建设', country: '中国', lang: '中文', category: '经贸政策', year: 2026, url: 'https://mp.weixin.qq.com/s/A1hL_iX4WfZx3ufjp3-j3A' },
  { title: 'RCEP区域全面经济伙伴关系协定文本及解读', country: '中国', lang: '中文', category: '关税协定', year: 2022, url: 'http://fta.mofcom.gov.cn/rcep/rcep_new.shtml' },
  { title: '重庆市加快培育从订购到交货的国际物流全链条服务体系实施方案（2025—2029年）', country: '中国', lang: '中文', category: '行业标准', year: 2025, url: 'https://www.cq.gov.cn/zt/xblhxtd/zcjj/zqszc/202504/t20250430_14573755.html' },
  { title: '加快推进西部陆海新通道一单制数字提单应用若干措施（试行）', country: '中国', lang: '中文', category: '行业标准', year: 2025, url: 'https://zfkawlb.cq.gov.cn/zwgk/zcwj/xzgfxwj_345066/202512/t20251223_15264992.html' },
  { title: '重庆市口岸物流办等五部门联合支持西部陆海新通道建设', country: '中国', lang: '中文', category: '经贸政策', year: 2025, url: 'http://zfkawlb.cq.gov.cn/zwgk/zcwj/qtwj_345067/202501/t20250102_14043178.html' },
  { title: '重庆市2024年促进跨境贸易便利化工作措施', country: '中国', lang: '中文', category: '经贸政策', year: 2024, url: 'https://zfkawlb.cq.gov.cn/zwgk/zcwj/qtwj_345067/202406/t20240619_13306697.html' },
  { title: '重庆市支持西部陆海新通道高质量发展若干政策措施', country: '中国', lang: '中文', category: '经贸政策', year: 2024, url: 'https://www.cq.gov.cn/zwgk/zfxxgkml/szfwj/xzgfxwj/szf/202404/t20240425_13158997.html' },
  { title: '重庆市十四五时期推进西部陆海新通道高质量建设的实施意见', country: '中国', lang: '中文', category: '经贸政策', year: 2022, url: 'https://www.cq.gov.cn/zwgk/zfxxgkml/szfwj/qtgw/202203/t20220318_10525804.html' },
  { title: '重庆市推进西部陆海新通道建设实施方案', country: '中国', lang: '中文', category: '经贸政策', year: 2020, url: 'https://www.cq.gov.cn/zwgk/zfxxgkml/szfwj/qtgw/202004/t20200410_8614338.html' },
  { title: '金融服务西部陆海新通道建设方案', country: '中国', lang: '中文', category: '经贸政策', year: 2022, url: 'https://zfkawlb.cq.gov.cn/zwgk/zcwj/qtwj_345067/202203/t20220314_10499976.html' },
  { title: '重庆市支持企业高质量发展若干政策措施', country: '中国', lang: '中文', category: '经贸政策', year: 2024, url: 'https://fzggw.cq.gov.cn/zwgk/zfxxgkml/zcwj/qtwj/202401/t20240110_12805400.html' },
  { title: '西部陆海新通道重大项目建设评估竞争性比选通知', country: '中国', lang: '中文', category: '经贸政策', year: 2024, url: 'https://fzggw.cq.gov.cn/zwxx/tzgg/202407/t20240719_13385460.html' },
  { title: '重庆出台四方面16条措施支持西部陆海新通道高质量发展', country: '中国', lang: '中文', category: '政策解读', year: 2024, url: 'https://www.cq.gov.cn/zt/xblhxtd/zcjj/zcjd/202404/t20240428_13165685.html' },
  { title: '《重庆市加快培育国际物流全链条服务体系实施方案》政策解读', country: '中国', lang: '中文', category: '政策解读', year: 2025, url: 'https://www.cq.gov.cn/zt/xblhxtd/zcjj/zcjd/202505/t20250509_14597524.html' },
  { title: '《重庆市支持西部陆海新通道高质量发展若干政策措施》政策解读', country: '中国', lang: '中文', category: '政策解读', year: 2024, url: 'https://www.cq.gov.cn/zt/xblhxtd/zcjj/zcjd/202412/t20241223_14009165.html' },
  { title: '重庆市十四五推进西部陆海新通道高质量建设的实施意见政策解读', country: '中国', lang: '中文', category: '政策解读', year: 2022, url: 'https://www.cq.gov.cn/zt/xblhxtd/zcjj/zcjd/202204/t20220421_10644685.html' },
  { title: '十四五时期重庆经西部陆海新通道集装箱运量将达30万标箱以上', country: '中国', lang: '中文', category: '政策解读', year: 2022, url: 'https://www.cq.gov.cn/zt/xblhxtd/zcjj/zcjd/202203/t20220322_10536212.html' },
  { title: '中国（重庆）自由贸易试验区数据出境负面清单管理办法', country: '中国', lang: '中文', category: '法律法规', year: 2025, url: 'https://sww.cq.gov.cn/zwgk_247/zfxxgkmlrk/zcwj/qtwj/202509/t20250905_14979480.html' },
  { title: '重庆市数字贸易和服务贸易高质量发展行动方案', country: '中国', lang: '中文', category: '经贸政策', year: 2025, url: 'https://sww.cq.gov.cn/zwgk_247/zfxxgkmlrk/zcwj/qtwj/202507/t20250724_14844043.html' },
  { title: '重庆市稳定外资发展若干措施', country: '中国', lang: '中文', category: '经贸政策', year: 2025, url: 'https://sww.cq.gov.cn/zwgk_247/zfxxgkmlrk/zcwj/qtwj/202508/t20250820_14918738.html' },
];

// --- Business Cases Data ---
var caseData = [
  { title: '汽车制造 · 渝车出海', company: '重庆长安/赛力斯等车企', industry: '汽车制造', country: '泰国/印尼/越南', desc: '重庆作为中国重要的汽车产业基地，积极推动新能源汽车出口。2024年重庆市发布渝车出海专项行动方案，目标是通过西部陆海新通道铁海联运优势大幅提升重庆造汽车在东盟市场份额。长安汽车在泰国建立右舵车生产基地，赛力斯等品牌通过铁海联运将新能源汽车高', tags: ['铁海联运','渝车出海','KD组装','RCEP'], link: 'cases/case-01-yuche-chuhai.html' },
  { title: '防城港—綦江货运班列：搭建新能源汽车铝材供应链新动脉', company: '新能源汽车产业链', industry: '供应链', country: '广西防城港→重庆綦江', desc: '2025年底，防城港至綦江货运班列正式开通运营。这条班列将进口铝材从广西北部湾港防城港经铁路直达重庆綦江区，专门服务于重庆新能源汽车制造企业的铝材需求。綦江区建设铝材料精深加工产业园，形成了进口铝土矿或铝材—北部湾港—铁路运输—綦江产业园的', tags: ['铁海联运','原产地累积规则','长协定价','供应链韧性'], link: 'cases/case-02-aluminum-supply.html' },
  { title: '巴渝土特产出海：潼南柠檬48小时从田间到越南超市货架', company: '重庆磊书果品等农产品企业', industry: '农产品出口', country: '越南/泰国/东盟', desc: '2026年一季度，重庆巴渝土特产出口额同比增长35.9%。潼南区青柠檬迎来采摘期，在磊书果品有限公司生产车间，工人忙着分选果子并打包装箱。通过西部陆海新通道跨境公路班车，这批鲜果仅需48小时就能摆上越南河内的超市货架。RCEP关税减让使重庆', tags: ['跨境公路班车','冷链物流','原产地证FORM E','RCEP'], link: 'cases/case-03-agri-export.html' },
  { title: '中老铁路进口老挝香蕉：一站式服务实现310标箱同比增长370%', company: '陆海新通道运营有限公司', industry: '进口贸易', country: '老挝→重庆', desc: '2026年1-4月，陆海新通道运营有限公司通过中老铁路从老挝进口香蕉310标箱，同比增长370%。公司为进口水果提供从产地集货、跨境运输、口岸清关、冷链仓储到国内分拨的一站式全链条服务。中老铁路自2021年开通以来已成为中国与东盟水果贸易的', tags: ['中老铁路','冷链班列','一站式服务','供应链金融'], link: 'cases/case-04-banana-import.html' },
  { title: '跨境公路班车：年发运12555车次增长91%的物流新势力', company: '西部陆海新通道跨境公路班车', industry: '跨境物流', country: '重庆→越南/老挝/缅甸', desc: '2025年全年，西部陆海新通道跨境公路班车发运12555车次，同比增长91%。跨境公路班车作为铁海联运的重要补充，主要服务于门到门的短途跨境运输，尤其适合鲜活农产品、跨境电商包裹等高时效货物。班车从重庆出发经广西凭祥或云南磨憨等口岸出境，4', tags: ['跨境公路班车','TIR公约','冷链物流','口岸通关'], link: 'cases/case-05-cross-border-truck.html' },
  { title: '东盟快班升级亚欧快线：精准破解双向衔接最后一公里难题', company: '重庆团结村中心站', industry: '国际联运', country: '东盟↔重庆↔欧洲', desc: '2026年，原有的东盟快班正式升级为亚欧快线，实现了西部陆海新通道南向与中欧班列北向的双向无缝衔接。此前东盟快班主要服务南向通道，中欧班列服务北向通道，两条通道在重庆团结村中心站形成物理交汇但运营相互独立。亚欧快线的推出将一列从越南河内启运', tags: ['亚欧快线','中欧班列','多式联运一单制','铁路快速通关'], link: 'cases/case-06-asia-europe-express.html' },
  { title: '金融支持通道建设：八部委联合发文与金融服务中心揭牌', company: '八部委联合/重庆市政府', industry: '金融支持', country: '重庆', desc: '2026年2月，金融支持西部陆海新通道建设工作会议在重庆召开。重庆市委书记袁家军出席并讲话，中国人民银行行长潘功胜发表讲话。会上陆海新通道金融服务中心正式揭牌。此前八部委联合印发《关于金融支持加快西部陆海新通道建设的意见》，完善通道金融服务', tags: ['跨境人民币结算','供应链金融','贸易融资','汇率避险'], link: 'cases/case-07-finance-support.html' },
  { title: '团结村中心站：中欧班列十年增长3.6倍的枢纽传奇', company: '重庆团结村中心站', industry: '枢纽经济', country: '重庆→中亚/欧洲', desc: '重庆团结村中心站是中国西部最重要的铁路物流枢纽之一。十年间该站开行的中欧班列从414列增长至1911列，增长约3.6倍。团结村中心站已成为西部陆海新通道与中欧班列的核心交汇节点，承担着南向通道和北向通道的双向换装和中转功能。重庆作为通道主枢', tags: ['中欧班列','团结村中心站','通道枢纽','铁路快速通关'], link: 'cases/case-08-china-europe-rail.html' },
  { title: '重庆枢纽港产业园：超6万吨老挝木薯淀粉6天抵渝的超级运量', company: '重庆枢纽港产业园', industry: '大宗农产品', country: '老挝→重庆', desc: '重庆枢纽港产业园完成了单批次超6万吨老挝木薯淀粉的进口，利用中老铁路仅需6天时间从万象运抵重庆。木薯淀粉是食品、造纸、纺织等行业的重要工业原料，中国年进口需求超过300万吨。老挝正在取代泰国成为中国新的木薯淀粉主要进口来源地，中老铁路开通后', tags: ['中老铁路','枢纽港产业园','大宗农产品','冷链班列'], link: 'cases/case-09-cassava-import.html' }
];

// --- Business Terms Data ---


var termData = [
  { cn: '铁海联运', en: 'Rail-Sea Intermodal Transport', domain: '物流运输', def: '指铁路运输与海运相结合的联合运输方式，是西部陆海新通道的核心物流模式。' },
  { cn: '一单制', en: 'Single Document System', domain: '物流运输', def: '多式联运中只需签发一张运输单据即可完成全程运输的便利化制度。' },
  { cn: '西部陆海新通道', en: 'New International Land-Sea Trade Corridor', domain: '国际贸易', def: '中国西部省份通过广西北部湾港等沿海沿边口岸连接东盟及其他国家的国际贸易物流大通道。' },
  { cn: '原产地证书', en: 'Certificate of Origin', domain: '国际贸易', def: '证明货物原产国或制造地的官方文件，用于享受关税优惠待遇。' },
  { cn: '跨境电商综试区', en: 'Cross-Border E-Commerce Comprehensive Pilot Zone', domain: '跨境电商', def: '国家设立的跨境电子商务综合试验区，享有通关、退税、结汇等便利化政策。' },
  { cn: '海外仓', en: 'Overseas Warehouse', domain: '跨境电商', def: '在境外设立的仓储设施，用于跨境电商商品的存储、分拣和配送。' },
  { cn: 'RCEP', en: 'Regional Comprehensive Economic Partnership', domain: '国际贸易', def: '区域全面经济伙伴关系协定，由东盟十国及中、日、韩、澳、新共同签署的自由贸易协定。' },
  { cn: '保税物流中心', en: 'Bonded Logistics Center', domain: '物流运输', def: '经海关批准设立的保税监管场所，提供保税仓储、国际物流配送等服务。' },
  { cn: '信用证', en: 'Letter of Credit (L/C)', domain: '金融结算', def: '银行应进口商请求开立的有条件付款承诺凭证，是国际贸易中常见的结算方式。' },
  { cn: '自贸试验区', en: 'Pilot Free Trade Zone', domain: '国际贸易', def: '国家设立的实行特殊开放政策和制度的特定区域，重庆自贸试验区是西部陆海新通道的重要节点。' },
  { cn: '渝车出海', en: 'Chongqing Auto Export Initiative', domain: '国际贸易', def: '重庆推动本地汽车产业拓展国际市场的专项行动计划，重点面向东盟、中东等市场。' },
  { cn: '跨境电商B2B出口', en: 'Cross-Border E-Commerce B2B Export', domain: '跨境电商', def: '境内企业通过跨境物流将货物运送至境外企业或海外仓，并通过跨境电商平台完成交易的贸易方式。' },
  { cn: '海关AEO认证', en: 'Authorized Economic Operator (AEO)', domain: '法律合规', def: '海关对信用状况、守法程度和安全管理良好的企业实施的认证制度，AEO企业可享受通关便利。' },
  { cn: '关税减让', en: 'Tariff Concession', domain: '国际贸易', def: '根据贸易协定降低或取消进口关税的措施，是自贸协定的核心内容之一。' },
  { cn: '市场准入负面清单', en: 'Negative List for Market Access', domain: '法律合规', def: '列明禁止或限制外商投资领域的清单，清单之外的领域对外资实行国民待遇。' },
  { cn: '清真认证', en: 'Halal Certification', domain: '法律合规', def: '证明产品符合伊斯兰教法要求的认证，是进入东南亚穆斯林市场的重要合规要求。' },
  { cn: '跨境人民币结算', en: 'Cross-Border RMB Settlement', domain: '金融结算', def: '在跨境贸易和投资中使用人民币进行计价和结算的业务模式，可降低汇率风险。' },
  { cn: 'T/T电汇', en: 'Telegraphic Transfer (T/T)', domain: '金融结算', def: '通过银行电子系统进行国际资金转移的结算方式，分为前T/T（预付）和后T/T（货到付款）。' },
  { cn: 'KD组装', en: 'Knocked-Down Assembly', domain: '汽车制造', def: '将整车拆分为散件出口，在目标市场进行组装的制造模式，可有效降低关税成本。' },
  { cn: 'FOB离岸价', en: 'Free On Board (FOB)', domain: '国际贸易', def: '卖方在指定装运港将货物交至买方指定船只即完成交货的贸易术语。' },
  { cn: 'CIF到岸价', en: 'Cost, Insurance and Freight (CIF)', domain: '国际贸易', def: '卖方承担运费和保险费将货物运至指定目的港的贸易术语。' },
  { cn: '品牌本土化', en: 'Brand Localization', domain: '市场营销', def: '企业根据目标市场文化特征调整品牌名称、标识和传播策略的过程。' },
  { cn: '跨文化沟通能力', en: 'Cross-Cultural Communication Competence', domain: '跨文化沟通', def: '在不同文化背景下有效交流和协作的能力，包括语言能力、文化意识和适应性。' },
  { cn: '商务谈判策略', en: 'Business Negotiation Strategy', domain: '跨文化沟通', def: '在国际商务活动中为实现谈判目标而制定的系统性方案，需考虑文化差异因素。' },
  { cn: '不可抗力条款', en: 'Force Majeure Clause', domain: '法律合规', def: '合同中约定因不能预见、不能避免、不能克服的客观情况导致无法履约时责任豁免的条款。' },
  { cn: '知识产权保护', en: 'Intellectual Property Protection', domain: '法律合规', def: '对专利、商标、著作权等智力成果的法律保护措施，是企业国际化的核心关切。' },
  { cn: '供应链韧性', en: 'Supply Chain Resilience', domain: '物流运输', def: '供应链在面对外部冲击时保持连续性和快速恢复的能力，在全球化背景下日益重要。' },
  { cn: '数字贸易规则', en: 'Digital Trade Rules', domain: '法律合规', def: '规范跨境数据流动、数字服务贸易等活动的国际规则体系，是新兴贸易议题。' },
  { cn: '多式联运提单', en: 'Multimodal Transport Bill of Lading', domain: '物流运输', def: '涵盖两种及以上运输方式的全程运输单据，是多式联运\"一单制\"的核心凭证。' },
  { cn: '区域品牌联营', en: 'Regional Brand Co-Branding', domain: '市场营销', def: '西部地区多企业联合打造区域品牌开拓国际市场的合作策略。' },
  { cn: '保税展示交易', en: 'Bonded Display and Trading', domain: '跨境电商', def: '在海关特殊监管区域内进行商品展示并完成交易的创新贸易模式。' },
  { cn: '汇率避险工具', en: 'Exchange Rate Hedging Instruments', domain: '金融结算', def: '帮助企业规避汇率波动风险的金融工具，如远期结售汇、外汇期权等。' },
  { cn: '东盟自贸区原产地累计规则', en: 'ASEAN FTA Cumulative Rules of Origin', domain: '国际贸易', def: '允许使用来自自贸区其他成员国的原材料视为原产材料的规则，有利于区域供应链整合。' },
  { cn: '国际商事仲裁', en: 'International Commercial Arbitration', domain: '法律合规', def: '解决国际商事纠纷的非诉讼方式，具有跨国执行力和专业性优势。' },
  { cn: '海外投资保险', en: 'Overseas Investment Insurance', domain: '金融结算', def: '为本国企业境外投资提供政治风险保障的保险产品，由中国信保等机构承保。' },
  { cn: '标准互认', en: 'Mutual Recognition of Standards', domain: '法律合规', def: '不同国家之间相互承认对方的产品标准或认证结果的制度安排，可降低贸易壁垒。' },
  { cn: '新质生产力', en: 'New Quality Productive Forces', domain: '国际贸易', def: '以科技创新为核心驱动力的先进生产力形态，包括新能源、数字经济等战略性新兴产业。' },
  { cn: '贸易便利化', en: 'Trade Facilitation', domain: '国际贸易', def: '简化和协调国际贸易程序，降低贸易成本，提高贸易效率的系统性措施。' },
  { cn: '本地化率', en: 'Local Content Ratio', domain: '法律合规', def: '产品在目标市场国生产的零部件或服务占产品总价值的比例要求，影响关税优惠资格。' },
  { cn: '跨境数据流动', en: 'Cross-Border Data Flow', domain: '法律合规', def: '数据在不同国家之间的传输和访问，受各国数据保护法律和数字贸易规则的约束。' },
];

// --- Academic Data ---
var acadData = [
  { title: '西部陆海新通道建设对中国-东盟贸易流量的影响研究', author: '张明华, 李伟', source: '国际贸易问题', type: '期刊论文', year: 2025 },
  { title: '数字陆海新通道：重庆广西共建框架下的数据互联互通研究', author: '重庆市综合经济研究院', source: '数字经济研究', type: '研究报告', year: 2026 },
  { title: 'The New Land-Sea Corridor and Regional Economic Integration in Southeast Asia', author: 'Chen, X., Wang, Y.', source: 'Journal of Southeast Asian Economies', type: '期刊论文', year: 2025 },
  { title: '西部陆海新通道"铁海联运"物流效率评价与优化路径', author: '王建国', source: '重庆大学', type: '学位论文', year: 2024 },
  { title: '多式联运"一单制"改革对跨境贸易便利化的影响', author: '刘志强, 赵晓峰', source: '中国流通经济', type: '期刊论文', year: 2024 },
  { title: '金融支持西部陆海新通道建设：政策框架与实践路径', author: '中国人民银行重庆营管部课题组', source: '金融研究', type: '研究报告', year: 2026 },
  { title: 'RCEP框架下西部陆海新通道关税减让效应分析', author: '孙红梅, 陈立', source: '海关与经贸研究', type: '期刊论文', year: 2024 },
  { title: '渝车出海：重庆汽车产业国际化路径与政策支撑体系', author: '周建华 等', source: '重庆社会科学', type: '研究报告', year: 2025 },
  { title: '《联合国可转让货物单证公约》对多式联运规则的影响', author: '交通运输部规划研究院', source: '交通运输研究', type: '政策解读', year: 2026 },
  { title: '东盟国家跨境电商市场监管政策比较研究', author: '林晓燕', source: '东南亚研究', type: '期刊论文', year: 2023 },
  { title: '西部陆海新通道跨境公路班车运营模式与发展对策', author: '西部陆海新通道运营中心', source: '通道运营白皮书', type: '研究报告', year: 2026 },
  { title: 'A Corpus-Based Study of Business Terminology Translation along the New Land-Sea Corridor', author: 'Yang, L., Zhang, H.', source: 'Translation Studies Quarterly', type: '期刊论文', year: 2024 },
  { title: '中欧班列与西部陆海新通道双向衔接研究——以团结村中心站为例', author: '钱钟书', source: '铁道运输与经济', type: '期刊论文', year: 2026 },
  { title: '西部陆海新通道2025年运行数据分析报告', author: '陆海新通道运营有限公司', source: '通道运营白皮书', type: '研究报告', year: 2026 },
  { title: '中国-东盟经贸合作新格局下的语言服务需求研究', author: '马晓丽', source: '四川外国语大学', type: '学位论文', year: 2023 },
  { title: '西部陆海新通道发展指数编制方法与监测评价', author: '交通运输部规划研究院', source: '交通运输研究', type: '研究报告', year: 2025 },
  { title: 'The Belt and Road Initiative and the New Land-Sea Corridor: A Comparative Analysis', author: 'Brown, R., Smith, T.', source: 'Asian Economic Policy Review', type: '期刊论文', year: 2024 },
  { title: '跨境物流通道对西部内陆开放型经济发展的影响', author: '黄志刚, 吴晓波', source: '经济地理', type: '期刊论文', year: 2024 },
  { title: '东南亚国家外商投资国家安全审查制度比较', author: '陈思远', source: '国际商务研究', type: '期刊论文', year: 2024 },
  { title: '重庆建设内陆开放高地的战略路径研究', author: '重庆市综合经济研究院', source: '重庆经济', type: '研究报告', year: 2025 },
  { title: '防城港—綦江货运班列搭建新能源汽车铝材供应链研究', author: '重庆市经信委', source: '产业发展研究', type: '研究报告', year: 2026 },
  { title: 'Digital Trade Facilitation along the New Land-Sea Corridor: Opportunities and Challenges', author: 'Li, J., Park, S.', source: 'Digital Economy Review', type: '期刊论文', year: 2025 },
  { title: '西部陆海新通道沿线省份对外贸易竞争力评价', author: '杨立群', source: '区域经济评论', type: '期刊论文', year: 2024 },
  { title: '东盟小语种商务翻译人才培养模式创新', author: '赵雅文, 刘芳', source: '外语与外语教学', type: '期刊论文', year: 2023 },
  { title: '中老铁路开通对西部陆海新通道货流格局的影响', author: '钱钟书', source: '铁道运输与经济', type: '期刊论文', year: 2025 },
  { title: '跨境电商海外仓选址优化模型——以西部陆海新通道为例', author: '何伟', source: '物流技术', type: '期刊论文', year: 2024 },
  { title: '陆海新通道背景下重庆制造业转型升级路径', author: '重庆市经信委课题组', source: '产业发展研究', type: '政策解读', year: 2025 },
  { title: '"双循环"新发展格局下西部陆海新通道的战略定位', author: '魏建国', source: '宏观经济管理', type: '期刊论文', year: 2023 },
  { title: '中国与东盟农产品贸易新通道——陆海新通道"食农产业"联盟模式', author: '中国宏观经济研究院', source: '宏观经济研究', type: '研究报告', year: 2026 },
  { title: '基于大数据的西部陆海新通道贸易网络演化分析', author: '陈明, 张涛, 吴刚', source: '管理科学学报', type: '期刊论文', year: 2025 }
];

// ============ MODULE RENDERERS ============

// --- Literature Module ---
(function() {
  var page = 1, pageSize = 10;
  var filtered = litData.slice();

  function filter() {
    var s = (document.getElementById('litSearch')?.value || '').toLowerCase();
    var lang = document.getElementById('litLang')?.value || '';
    var country = document.getElementById('litCountry')?.value || '';
    var cat = document.getElementById('litCategory')?.value || '';
    filtered = litData.filter(function(d) {
      if (s && !d.title.toLowerCase().includes(s) && !d.country.includes(s) && !d.category.includes(s)) return false;
      if (lang && d.lang !== lang) return false;
      if (country && d.country !== country) return false;
      if (cat && d.category !== cat) return false;
      return true;
    });
    page = 1;
    render();
  }

  function render() {
    var total = Math.ceil(filtered.length / pageSize);
    var start = (page - 1) * pageSize;
    var rows = filtered.slice(start, start + pageSize);
    var tbody = document.querySelector('#litTable tbody');
    tbody.innerHTML = rows.map(function(d) {
      return '<tr><td>' + d.title + '</td><td>' + d.country + '</td><td>' + d.lang + '</td><td>' + d.category + '</td><td>' + d.year + '</td><td><a class=\"action-link\" href=\"' + d.url + '\" target=\"_blank\">查看原文</a></td></tr>';
    }).join('');
    if (rows.length === 0) tbody.innerHTML = '<tr><td colspan=\"6\" style=\"text-align:center;padding:32px;color:#8895a7\">未找到匹配的文献记录</td></tr>';
    renderPagination('litPagination', page, total, function(p) { page = p; render(); });
  }

  document.getElementById('litSearchBtn').addEventListener('click', filter);
  document.getElementById('litSearch').addEventListener('keydown', function(e) { if (e.key === 'Enter') filter(); });
  document.getElementById('litLang').addEventListener('change', filter);
  document.getElementById('litCountry').addEventListener('change', filter);
  document.getElementById('litCategory').addEventListener('change', filter);
  render();
})();

// --- Business Module: Cases ---
(function() {
  var page = 1, pageSize = 10;
  var filtered = caseData.slice();

  function filter() {
    var s = (document.getElementById('caseSearch')?.value || '').toLowerCase();
    var industry = document.getElementById('caseIndustry')?.value || '';
    var country = document.getElementById('caseCountry')?.value || '';
    filtered = caseData.filter(function(d) {
      if (s && !d.title.toLowerCase().includes(s) && !d.company.includes(s) && !d.industry.includes(s)) return false;
      if (industry && d.industry !== industry) return false;
      if (country && d.country !== country) return false;
      return true;
    });
    page = 1;
    render();
  }

  function render() {
    var total = Math.ceil(filtered.length / pageSize);
    var start = (page - 1) * pageSize;
    var items = filtered.slice(start, start + pageSize);
    var grid = document.getElementById('caseGrid');
    grid.innerHTML = items.map(function(d) {
      var hasLink = d.link ? true : false;
      var h = '';
      if (hasLink) h += '<a href=\"' + d.link + '\" class=\"case-card-link\">';
      h += '<div class=\"case-card' + (hasLink ? ' clickable' : '') + '\"><h4>' + d.title + '</h4>';
      h += '<div class=\"case-meta\"><span>' + d.company + '</span><span>' + d.country + '</span></div>';
      h += '<div class=\"case-tags\">' + d.tags.map(function(t) { return '<span class=\"case-tag\">' + t + '</span>'; }).join('') + '</div>';
      h += '<p class=\"case-desc\">' + d.desc + '</p></div>';
      if (hasLink) h += '</a>';
      return h;
    }).join('');
    if (items.length === 0) grid.innerHTML = '<p style=\"grid-column:span 1 / -1;text-align:center;padding:48px;color:#8895a7\">未找到匹配的案例</p>';
    renderPagination('casePagination', page, total, function(p) { page = p; render(); });
  }

  document.getElementById('caseSearchBtn').addEventListener('click', filter);
  document.getElementById('caseSearch')?.addEventListener('keydown', function(e) { if (e.key === 'Enter') filter(); });
  document.getElementById('caseIndustry')?.addEventListener('change', filter);
  document.getElementById('caseCountry')?.addEventListener('change', filter);
  render();
})();

// --- Business Module: Terms ---
(function() {
  var page = 1, pageSize = 12;
  var filtered = termData.slice();

  function filter() {
    var s = (document.getElementById('termSearch')?.value || '').toLowerCase();
    var domain = document.getElementById('termDomain')?.value || '';
    filtered = termData.filter(function(d) {
      if (s && !d.cn.includes(s) && !d.en.toLowerCase().includes(s) && !d.def.includes(s)) return false;
      if (domain && d.domain !== domain) return false;
      return true;
    });
    page = 1;
    render();
  }

  function render() {
    var total = Math.ceil(filtered.length / pageSize);
    var start = (page - 1) * pageSize;
    var rows = filtered.slice(start, start + pageSize);
    var tbody = document.querySelector('#termTable tbody');
    tbody.innerHTML = rows.map(function(d) {
      return '<tr><td>' + d.cn + '</td><td>' + d.en + '</td><td>' + d.domain + '</td><td style=\"max-width:340px\">' + d.def + '</td></tr>';
    }).join('');
    if (rows.length === 0) tbody.innerHTML = '<tr><td colspan=\"4\" style=\"text-align:center;padding:32px;color:#8895a7\">未找到匹配的术语</td></tr>';
    renderPagination('termPagination', page, total, function(p) { page = p; render(); });
  }

  document.getElementById('termSearchBtn').addEventListener('click', filter);
  document.getElementById('termSearch')?.addEventListener('keydown', function(e) { if (e.key === 'Enter') filter(); });
  document.getElementById('termDomain')?.addEventListener('change', filter);
  render();
})();

// --- Academic Module ---
(function() {
  var page = 1, pageSize = 10;
  var filtered = acadData.slice();

  function filter() {
    var s = (document.getElementById('acadSearch')?.value || '').toLowerCase();
    var type = document.getElementById('acadType')?.value || '';
    var year = document.getElementById('acadYear')?.value || '';
    var lang = document.getElementById('acadLang')?.value || '';
    filtered = acadData.filter(function(d) {
      if (s && !d.title.toLowerCase().includes(s) && !d.author.includes(s) && !d.source.includes(s)) return false;
      if (type && d.type !== type) return false;
      if (year && d.year !== parseInt(year)) return false;
      if (lang && ((lang === '英文' && !/[a-zA-Z]/.test(d.title[0])) || (lang === '中文' && /[a-zA-Z]/.test(d.title[0])))) return false;
      return true;
    });
    page = 1;
    render();
  }

  function render() {
    var total = Math.ceil(filtered.length / pageSize);
    var start = (page - 1) * pageSize;
    var rows = filtered.slice(start, start + pageSize);
    var tbody = document.querySelector('#acadTable tbody');
    tbody.innerHTML = rows.map(function(d) {
      return '<tr><td>' + d.title + '</td><td>' + d.author + '</td><td>' + d.source + '</td><td>' + d.type + '</td><td>' + d.year + '</td><td><a class=\"action-link\" href=\"#\">查看详情</a></td></tr>';
    }).join('');
    if (rows.length === 0) tbody.innerHTML = '<tr><td colspan=\"6\" style=\"text-align:center;padding:32px;color:#8895a7\">未找到匹配的学术成果</td></tr>';
    renderPagination('acadPagination', page, total, function(p) { page = p; render(); });
  }

  document.getElementById('acadSearchBtn').addEventListener('click', filter);
  document.getElementById('acadSearch')?.addEventListener('keydown', function(e) { if (e.key === 'Enter') filter(); });
  document.getElementById('acadType')?.addEventListener('change', filter);
  document.getElementById('acadYear')?.addEventListener('change', filter);
  document.getElementById('acadLang')?.addEventListener('change', filter);
  render();
})();

// ============ CHARTS ============
var chartsInited = false;

function initCharts() {
  if (chartsInited) {
    // Resize existing charts
    Object.values(echarts.getInstanceByDom).forEach(function(inst) {
      try { inst.resize(); } catch(e) {}
    });
    // Actually check all chart doms
    ['chartVolume','chartIndex','chartNetwork'].forEach(function(id) {
      var dom = document.getElementById(id);
      if (dom) {
        var inst = echarts.getInstanceByDom(dom);
        if (inst) inst.resize();
      }
    });
    return;
  }
  chartsInited = true;

  // 1. Rail-Sea Intermodal Volume
  var volDom = document.getElementById('chartVolume');
  if (volDom) {
    var volChart = echarts.init(volDom);
    volChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['铁海联运班列运量'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: { type: 'category', data: ['2017','2018','2019','2020','2021','2022','2023','2024','2025'] },
      yAxis: { type: 'value', name: '万标箱' },
      series: [{
        name: '铁海联运班列运量', type: 'bar',
        data: [0.34, 5.34, 9.4, 22.4, 31.6, 51.8, 86.1, 96, 142.5],
        itemStyle: { color: '#1a3a5c' },
        markLine: { data: [{ type: 'average', name: '平均值' }], lineStyle: { color: '#c4a142', type: 'dashed' } }
      }]
    });
  }

  // 2. Development Index
  var idxDom = document.getElementById('chartIndex');
  if (idxDom) {
    var idxChart = echarts.init(idxDom);
    idxChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: { type: 'category', data: ['2019','2020','2021','2022','2023','2024','2025'] },
      yAxis: { type: 'value', name: '指数点', min: 80 },
      series: [{
        name: '通道发展指数', type: 'line', smooth: true,
        data: [100, 112.5, 112.9, 151.2, 151.5, 192.3, 202.6],
        itemStyle: { color: '#c4a142' },
        areaStyle: { color: 'rgba(196,161,66,0.15)' },
        markPoints: { data: [{ type: 'max', name: '最高点' }] }
      }]
    });
  }

  // 3. Network Coverage
  var netDom = document.getElementById('chartNetwork');
  if (netDom) {
    var netChart = echarts.init(netDom);
    netChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['覆盖国家/地区','通达港口'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: { type: 'category', data: ['2017','2018','2019','2020','2021','2022','2023','2024','2025'] },
      yAxis: [{ type: 'value', name: '国家/地区数' }, { type: 'value', name: '港口数' }],
      series: [
        { name: '覆盖国家/地区', type: 'bar', data: [24, 38, 54, 71, 87, 98, 110, 120, 127], itemStyle: { color: '#1a3a5c' } },
        { name: '通达港口', type: 'line', yAxisIndex: 1, data: [58, 92, 145, 206, 278, 358, 441, 508, 581], itemStyle: { color: '#c4a142' }, smooth: true }
      ]
    });
  }

  // Handle resize
  window.addEventListener('resize', function() {
    var ids = ['chartVolume','chartIndex','chartNetwork'];
    ids.forEach(function(id) {
      var dom = document.getElementById(id);
      if (dom) {
        var inst = echarts.getInstanceByDom(dom);
        if (inst) inst.resize();
      }
    });
  });
}

// ============ INTERACTION SYSTEM ============
(function() {
  'use strict';

  // --- 1. Scroll Progress Bar ---
  var progressBar = document.getElementById('scrollProgress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.id = 'scrollProgress';
    document.body.prepend(progressBar);
  }

  function updateProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // --- 2. Header Scroll Effect (Glass) ---
  var header = document.querySelector('.site-header');
  function updateHeader() {
    if (window.pageYOffset > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });

  // --- 3. Back to Top Button ---
  var backBtn = document.getElementById('backToTop');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.id = 'backToTop';
    backBtn.setAttribute('aria-label', '返回顶部');
    backBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(backBtn);
  }
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function updateBackBtn() {
    if (window.pageYOffset > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', updateBackBtn, { passive: true });

  // --- 4. Scroll Reveal with IntersectionObserver ---
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (els.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function(el) { observer.observe(el); });
  }

  // --- 5. Number Count-up Animation ---
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    var isDecimal = target % 1 !== 0;
    var duration = 1200;
    var numEl = el.querySelector('.stat-number') || el;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;
      numEl.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        numEl.textContent = isDecimal ? target.toFixed(1) : target;
        el.classList.add('counted');
      }
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('.stat-value[data-target]');
    if (counters.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.classList.contains('counted')) return;
          animateCounter(el);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { observer.observe(el); });
  }

  // --- 6. Enhanced Module Transition ---
  var origSwitch = window.switchModule;
  if (origSwitch) {
    var _origSwitch = origSwitch;
    window.switchModule = function(id) {
      var prev = document.querySelector('.module.active');
      _origSwitch(id);
      var cur = document.querySelector('.module.active');
      if (cur) {
        cur.classList.remove('fade-enter');
        // Force reflow
        void cur.offsetWidth;
        cur.classList.add('fade-enter');
      }
    };
  }

  // --- 7. Row Hover Sound Effect (Visual only - "ripple" on table rows) ---
  // This is purely cosmetic; no actual sound.
  document.querySelectorAll('.data-table tbody tr').forEach(function(row) {
    row.addEventListener('mouseenter', function() {
      this.style.transition = 'background 0.15s ease, transform 0.15s ease';
    });
  });

  // --- Init after DOM ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initReveal();
      initCounters();
      setTimeout(initCharts, 300);
    });
  } else {
    initReveal();
    initCounters();
    setTimeout(initCharts, 300);
  }

  // Re-init on module switch (new content may have reveal/counter targets)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.nav-btn, .go-btn, .subtab-btn');
    if (btn) {
      setTimeout(function() {
        initReveal();
        initCounters();
      }, 100);
    }
  });

})();
