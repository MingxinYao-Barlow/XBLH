
// === Navigation ===
(function() {
  const nav = document.getElementById('mainNav');
  const modules = document.querySelectorAll('.module');

  function switchModule(id) {
    modules.forEach(m => m.classList.remove('active'));
    const target = document.getElementById('module-' + id);
    if (target) target.classList.add('active');
    nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const btn = nav.querySelector('[data-module="' + id + '"]');
    if (btn) btn.classList.add('active');
    if (id === 'data') initCharts();
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
  { title: '西部陆海新通道总体规划', country: '中国', lang: '中文', category: '经贸政策', year: 2019 },
  { title: 'New International Land-Sea Trade Corridor Master Plan', country: '中国', lang: '英语', category: '经贸政策', year: 2019 },
  { title: 'RCEP区域全面经济伙伴关系协定文本', country: '中国', lang: '中文', category: '关税协定', year: 2022 },
  { title: 'Regional Comprehensive Economic Partnership Agreement', country: '中国', lang: '英语', category: '关税协定', year: 2022 },
  { title: 'Việt Nam - Hiệp định Thương mại Tự do với Liên minh Kinh tế Á-Âu', country: '越南', lang: '越南语', category: '关税协定', year: 2020 },
  { title: 'Thailand Investment Promotion Act B.E. 2560', country: '泰国', lang: '泰语', category: '投资指南', year: 2017 },
  { title: '泰国投资促进法（2017年修订版）中文译本', country: '泰国', lang: '中文', category: '投资指南', year: 2017 },
  { title: 'Indonesia Omnibus Law on Job Creation', country: '印度尼西亚', lang: '印尼语', category: '法律法规', year: 2020 },
  { title: 'Malaysia National Trade Blueprint 2021-2025', country: '马来西亚', lang: '英语', category: '经贸政策', year: 2021 },
  { title: '中国-东盟自由贸易区升级议定书', country: '中国', lang: '中文', category: '关税协定', year: 2019 },
  { title: 'Protocol to Amend the Framework Agreement on Comprehensive Economic Co-operation between ASEAN and China', country: '中国', lang: '英语', category: '关税协定', year: 2019 },
  { title: '重庆市推进西部陆海新通道建设实施方案', country: '中国', lang: '中文', category: '经贸政策', year: 2020 },
  { title: 'Lao PDR Investment Promotion Law', country: '老挝', lang: '老挝语', category: '投资指南', year: 2016 },
  { title: 'Myanmar Companies Law 2017', country: '缅甸', lang: '缅甸语', category: '法律法规', year: 2017 },
  { title: 'Cambodia Law on Investment 2021', country: '柬埔寨', lang: '柬埔寨语', category: '投资指南', year: 2021 },
  { title: 'Singapore Free Trade Agreement with China (CSFTA) Upgrade Protocol', country: '新加坡', lang: '英语', category: '关税协定', year: 2019 },
  { title: '\"十四五\"推进西部陆海新通道高质量建设实施方案', country: '中国', lang: '中文', category: '经贸政策', year: 2021 },
  { title: 'ASEAN-China Free Trade Area (ACFTA) Rules of Origin', country: '中国', lang: '英语', category: '关税协定', year: 2020 },
  { title: '西部陆海新通道铁海联运班列运行标准', country: '中国', lang: '中文', category: '行业标准', year: 2023 },
  { title: 'Rail-Sea Intermodal Train Operation Standards for the New Land-Sea Corridor', country: '中国', lang: '英语', category: '行业标准', year: 2023 },
  { title: '越南投资法（2020年修订）', country: '越南', lang: '中文', category: '法律法规', year: 2020 },
  { title: 'Peraturan Presiden tentang Percepatan Pembangunan Ekonomi di Koridor Ekonomi', country: '印度尼西亚', lang: '印尼语', category: '经贸政策', year: 2021 },
  { title: '西部陆海新通道跨境电子商务发展指导意见', country: '中国', lang: '中文', category: '经贸政策', year: 2024 },
  { title: 'Cross-Border E-Commerce Development Guidelines for the New Land-Sea Corridor', country: '中国', lang: '英语', category: '经贸政策', year: 2024 },
  { title: 'Thailand Eastern Economic Corridor Act', country: '泰国', lang: '英语', category: '法律法规', year: 2018 },
  { title: '西部陆海新通道多式联运\"一单制\"服务标准', country: '中国', lang: '中文', category: '行业标准', year: 2025 },
  { title: 'Malaysia Digital Economy Blueprint', country: '马来西亚', lang: '英语', category: '经贸政策', year: 2021 },
  { title: 'Japan-ASEAN Comprehensive Economic Partnership Agreement', country: '日本', lang: '英语', category: '关税协定', year: 2020 },
  { title: '韩国-东盟自由贸易协定升级议定书', country: '韩国', lang: '中文', category: '关税协定', year: 2021 },
  { title: '渝车出海专项行动方案（2024-2027年）', country: '中国', lang: '中文', category: '经贸政策', year: 2024 }
];

// --- Business Cases Data ---
var caseData = [
  { title: '重庆长安汽车东南亚市场拓展案例', company: '长安汽车', industry: '汽车制造', country: '泰国', desc: '长安汽车通过在泰国设立右舵车生产基地，成功打入东南亚市场，年出口量突破10万辆。案例涵盖市场调研、合资谈判、本地化生产策略。', tags: ['渝车出海','合资建厂','右舵车'] },
  { title: '赛力斯问界新能源汽车东盟出口战略', company: '赛力斯', industry: '汽车制造', country: '印度尼西亚', desc: '赛力斯借助西部陆海新通道铁海联运，将新能源汽车出口至印尼，通过本土化营销策略快速占领市场份额。', tags: ['新能源汽车','铁海联运','本土化'] },
  { title: '重庆宗申动力越南业务拓展与文化融合', company: '宗申动力', industry: '机械装备', country: '越南', desc: '宗申动力在越南投资建厂的跨文化管理实践，包括当地员工培训体系、中越管理团队协作模式。', tags: ['跨文化管理','制造业','人力资源'] },
  { title: '重庆跨境电商综合试验区对东盟出口模式创新', company: '重庆跨境电商综试区', industry: '跨境电商', country: '马来西亚', desc: '依托西部陆海新通道的物流优势，重庆跨境电商企业通过\"海外仓+直播电商\"模式拓展马来西亚市场。', tags: ['跨境电商','海外仓','直播电商'] },
  { title: '重庆机电集团老挝水电站设备出口与工程承包', company: '重庆机电集团', industry: '机械装备', country: '老挝', desc: '机电集团向老挝出口水电站设备的商务谈判全流程，包括技术方案对接、合同条款协商、跨境支付安排。', tags: ['工程承包','设备出口','商务谈判'] },
  { title: '重庆博腾制药印度尼西亚市场准入与合规', company: '博腾制药', industry: '生物医药', country: '印度尼西亚', desc: '博腾制药获取印尼药品注册许可的全过程，涉及清真认证、GMP审查、本地代理商选择等关键环节。', tags: ['市场准入','注册认证','合规'] },
  { title: '重庆力帆汽车缅甸KD组装项目', company: '力帆汽车', industry: '汽车制造', country: '缅甸', desc: '力帆汽车通过KD（散件组装）方式进入缅甸市场，包含技术转让方案、关税优化策略与售后服务体系建设。', tags: ['KD组装','技术转让','关税优化'] },
  { title: '重庆小康工业菲律宾新能源汽车试点推广', company: '小康工业', industry: '汽车制造', country: '菲律宾', desc: '小康工业在菲律宾推广电动商用车的试点项目，涵盖政策游说、充电基础设施合作及消费者教育。', tags: ['新能源汽车','试点推广','政策游说'] },
  { title: '重庆中科曙光新加坡智慧城市项目合作', company: '中科曙光', industry: '电子信息', country: '新加坡', desc: '中科曙光参与新加坡智慧城市建设的商务合作案例，涉及技术方案提案、知识产权谈判与数据跨境合规。', tags: ['智慧城市','数据合规','技术合作'] },
  { title: '重庆京东方越南显示面板供应链布局', company: '京东方', industry: '电子信息', country: '越南', desc: '京东方在越南北部建立显示面板模组工厂的供应链策略，包括供应商本地化率提升计划。', tags: ['供应链','本地化','制造业'] },
  { title: '重庆瑜欣平瑞电子柬埔寨电子元器件出口', company: '瑜欣平瑞', industry: '电子信息', country: '柬埔寨', desc: '中小企业通过西部陆海新通道拓展柬埔寨市场的典型经验，包含首次出口报关流程、信用证结算实务。', tags: ['中小企业','出口实务','信用证'] },
  { title: '重庆跨境电商\"蓉欧+\"东盟铁海联运物流方案', company: '重庆国际物流集团', industry: '跨境电商', country: '新加坡', desc: '整合中欧班列与西部陆海新通道的复合物流方案设计，实现欧洲-重庆-东盟的高效转运。', tags: ['多式联运','物流方案','供应链'] },
  { title: '重庆隆鑫通用动力泰国合资企业本土化管理', company: '隆鑫通用', industry: '机械装备', country: '泰国', desc: '隆鑫通用在泰国合资企业中推行\"中方技术+泰方管理\"融合模式的实践与挑战。', tags: ['合资企业','跨文化管理','本土化'] },
  { title: '重庆比亚迪刀片电池东南亚储能市场拓展', company: '比亚迪', industry: '新能源', country: '印度尼西亚', desc: '比亚迪利用西部陆海新通道出口刀片电池至印尼太阳能储能项目，涵盖技术标准对接与项目交付。', tags: ['新能源','储能','项目交付'] },
  { title: '重庆太极集团新加坡中药注册与市场推广', company: '太极集团', industry: '生物医药', country: '新加坡', desc: '太极集团推动中药产品在新加坡注册上市的全流程，包括传统药物注册路径选择与市场教育策略。', tags: ['中药注册','传统药物','市场教育'] }
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
  { cn: '跨境数据流动', en: 'Cross-Border Data Flow', domain: '法律合规', def: '数据在不同国家之间的传输和访问，受各国数据保护法律和数字贸易规则的约束。' }
];

// --- Academic Data ---
var acadData = [
  { title: '西部陆海新通道建设对中国-东盟贸易流量的影响研究', author: '张明华, 李伟', source: '国际贸易问题', type: '期刊论文', year: 2025 },
  { title: 'The New Land-Sea Corridor and Regional Economic Integration in Southeast Asia', author: 'Chen, X., Wang, Y.', source: 'Journal of Southeast Asian Economies', type: '期刊论文', year: 2025 },
  { title: '西部陆海新通道\"铁海联运\"物流效率评价与优化路径', author: '王建国', source: '重庆大学', type: '学位论文', year: 2024 },
  { title: '多式联运\"一单制\"改革对跨境贸易便利化的影响', author: '刘志强, 赵晓峰', source: '中国流通经济', type: '期刊论文', year: 2024 },
  { title: 'RCEP框架下西部陆海新通道关税减让效应分析', author: '孙红梅, 陈立', source: '海关与经贸研究', type: '期刊论文', year: 2024 },
  { title: '渝车出海：重庆汽车产业国际化路径与政策支撑体系', author: '周建华 等', source: '重庆社会科学', type: '研究报告', year: 2025 },
  { title: '东盟国家跨境电商市场监管政策比较研究', author: '林晓燕', source: '东南亚研究', type: '期刊论文', year: 2023 },
  { title: 'A Corpus-Based Study of Business Terminology Translation along the New Land-Sea Corridor', author: 'Yang, L., Zhang, H.', source: 'Translation Studies Quarterly', type: '期刊论文', year: 2024 },
  { title: '西部陆海新通道数字化建设进展与展望', author: '国家发改委综合运输研究所', source: '综合运输', type: '研究报告', year: 2025 },
  { title: '中国-东盟经贸合作新格局下的语言服务需求研究', author: '马晓丽', source: '四川外国语大学', type: '学位论文', year: 2023 },
  { title: '西部陆海新通道2025年运行数据分析报告', author: '陆海新通道运营有限公司', source: '通道运营白皮书', type: '研究报告', year: 2026 },
  { title: 'The Belt and Road Initiative and the New Land-Sea Corridor: A Comparative Analysis', author: 'Brown, R., Smith, T.', source: 'Asian Economic Policy Review', type: '期刊论文', year: 2024 },
  { title: '西部陆海新通道发展指数编制方法与监测评价', author: '交通运输部规划研究院', source: '交通运输研究', type: '研究报告', year: 2025 },
  { title: '跨境物流通道对西部内陆开放型经济发展的影响', author: '黄志刚, 吴晓波', source: '经济地理', type: '期刊论文', year: 2024 },
  { title: '东南亚国家外商投资国家安全审查制度比较', author: '陈思远', source: '国际商务研究', type: '期刊论文', year: 2024 },
  { title: '重庆建设内陆开放高地的战略路径研究', author: '重庆市综合经济研究院', source: '重庆经济', type: '研究报告', year: 2025 },
  { title: 'Digital Trade Facilitation along the New Land-Sea Corridor: Opportunities and Challenges', author: 'Li, J., Park, S.', source: 'Digital Economy Review', type: '期刊论文', year: 2025 },
  { title: '西部陆海新通道沿线省份对外贸易竞争力评价', author: '杨立群', source: '区域经济评论', type: '期刊论文', year: 2024 },
  { title: '东盟小语种商务翻译人才培养模式创新', author: '赵雅文, 刘芳', source: '外语与外语教学', type: '期刊论文', year: 2023 },
  { title: '中老铁路开通对西部陆海新通道货流格局的影响', author: '钱钟书', source: '铁道运输与经济', type: '期刊论文', year: 2025 },
  { title: '跨境电商海外仓选址优化模型——以西部陆海新通道为例', author: '何伟', source: '物流技术', type: '期刊论文', year: 2024 },
  { title: 'Cross-Cultural Business Negotiation in China-ASEAN Trade: A Case Study Approach', author: 'Meng, F., Ahmad, R.', source: 'International Journal of Cross Cultural Management', type: '期刊论文', year: 2024 },
  { title: '陆海新通道背景下重庆制造业转型升级路径', author: '重庆市经信委课题组', source: '产业发展研究', type: '政策解读', year: 2025 },
  { title: '\"双循环\"新发展格局下西部陆海新通道的战略定位', author: '魏建国', source: '宏观经济管理', type: '期刊论文', year: 2023 },
  { title: '西部陆海新通道对降低中西部地区物流成本的效果评估', author: '中国物流与采购联合会', source: '中国物流发展报告', type: '研究报告', year: 2025 },
  { title: 'ASEAN Connectivity and China\'s Western Development: Policy Synergies', author: 'Tanaka, H., Lee, M.', source: 'ASEAN Economic Bulletin', type: '期刊论文', year: 2024 },
  { title: '西部陆海新通道建设中的人才需求与培养策略', author: '重庆市教委高教处', source: '高等工程教育研究', type: '政策解读', year: 2024 },
  { title: '2026年西部陆海新通道发展形势分析与展望', author: '中国宏观经济研究院', source: '宏观经济研究', type: '研究报告', year: 2026 },
  { title: '西部陆海新通道与\"一带一路\"对接研究', author: '李文涛', source: '四川大学', type: '学位论文', year: 2023 },
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
      return '<tr><td>' + d.title + '</td><td>' + d.country + '</td><td>' + d.lang + '</td><td>' + d.category + '</td><td>' + d.year + '</td><td><a class=\"action-link\" href=\"#\">查看详情</a></td></tr>';
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
  var page = 1, pageSize = 9;
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
      return '<div class=\"case-card\"><h4>' + d.title + '</h4><div class=\"case-meta\"><span>' + d.company + '</span><span>' + d.country + '</span></div><div class=\"case-tags\">' + d.tags.map(function(t) { return '<span class=\"case-tag\">' + t + '</span>'; }).join('') + '</div><p class=\"case-desc\">' + d.desc + '</p></div>';
    }).join('');
    if (items.length === 0) grid.innerHTML = '<p style=\"grid-column:span 3;text-align:center;padding:48px;color:#8895a7\">未找到匹配的案例</p>';
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
    ['chartVolume','chartIndex','chartTrade','chartNetwork','chartCargo','chartHeatmap'].forEach(function(id) {
      var dom = document.getElementById(id);
      if (dom) {
        var inst = echarts.getInstanceByDom(dom);
        if (inst) inst.resize();
      }
    });
    return;
  }
  chartsInited = true;

  var commonOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '8%', containLabel: true }
  };

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
        data: [2.3, 5.8, 11.2, 22.4, 31.6, 51.8, 86.1, 115.3, 142.5],
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
        data: [100, 112.5, 129.8, 151.2, 173.5, 189.1, 202.6],
        itemStyle: { color: '#c4a142' },
        areaStyle: { color: 'rgba(196,161,66,0.15)' },
        markPoints: { data: [{ type: 'max', name: '最高点' }] }
      }]
    });
  }

  // 3. Trade Volume
  var tradeDom = document.getElementById('chartTrade');
  if (tradeDom) {
    var tradeChart = echarts.init(tradeDom);
    tradeChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['进出口额','出口额','进口额'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: { type: 'category', data: ['2018','2019','2020','2021','2022','2023','2024','2025'] },
      yAxis: { type: 'value', name: '万亿元' },
      series: [
        { name: '进出口额', type: 'line', data: [0.52, 0.68, 0.71, 0.89, 1.02, 1.18, 1.32, 1.52], itemStyle: { color: '#1a3a5c' }, smooth: true },
        { name: '出口额', type: 'line', data: [0.31, 0.40, 0.44, 0.54, 0.62, 0.73, 0.81, 0.94], itemStyle: { color: '#2c5f8a' }, smooth: true },
        { name: '进口额', type: 'line', data: [0.21, 0.28, 0.27, 0.35, 0.40, 0.45, 0.51, 0.58], itemStyle: { color: '#8895a7' }, smooth: true }
      ]
    });
  }

  // 4. Network Coverage
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

  // 5. Cargo Categories Pie
  var cargoDom = document.getElementById('chartCargo');
  if (cargoDom) {
    var cargoChart = echarts.init(cargoDom);
    cargoChart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
      legend: { orient: 'vertical', left: 'left', top: 'center', textStyle: { fontSize: 11 } },
      series: [{
        type: 'pie', radius: ['45%', '70%'], center: ['58%', '50%'], avoidLabelOverlap: false,
        itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 13, fontWeight: 'bold' } },
        data: [
          { value: 28, name: '机电产品', itemStyle: { color: '#1a3a5c' } },
          { value: 22, name: '汽车及零部件', itemStyle: { color: '#2c5f8a' } },
          { value: 18, name: '化工产品', itemStyle: { color: '#4a7fb5' } },
          { value: 12, name: '农产品', itemStyle: { color: '#7ba3cc' } },
          { value: 10, name: '矿产品', itemStyle: { color: '#c4a142' } },
          { value: 10, name: '其他', itemStyle: { color: '#d4c99e' } }
        ]
      }]
    });
  }

  // 6. Heatmap - Trade with corridor countries
  var heatDom = document.getElementById('chartHeatmap');
  if (heatDom) {
    var heatChart = echarts.init(heatDom);
    var countries = ['越南','泰国','印尼','马来西亚','新加坡','菲律宾','缅甸','老挝','柬埔寨','日本','韩国','俄罗斯'];
    var years = ['2019','2020','2021','2022','2023','2024','2025'];
    var heatData = [];
    var baseValues = {
      '越南': [820,790,950,1150,1380,1620,1850],
      '泰国': [620,580,710,860,1050,1280,1490],
      '印尼': [480,450,560,690,840,1020,1210],
      '马来西亚': [550,530,650,780,920,1100,1320],
      '新加坡': [390,370,450,540,650,780,930],
      '菲律宾': [280,250,310,380,470,560,680],
      '缅甸': [180,160,200,250,310,380,450],
      '老挝': [120,140,180,230,290,360,430],
      '柬埔寨': [90,85,110,140,180,230,280],
      '日本': [350,320,380,430,500,580,670],
      '韩国': [310,280,340,400,470,540,620],
      '俄罗斯': [260,240,290,350,420,500,580]
    };
    countries.forEach(function(country, i) {
      years.forEach(function(year, j) {
        heatData.push([j, i, baseValues[country][j]]);
      });
    });
    heatChart.setOption({
      tooltip: { position: 'top', formatter: function(p) { return countries[p.value[1]] + ' ' + years[p.value[0]] + '<br/>贸易额: ' + p.value[2] + ' 亿元'; } },
      grid: { left: '8%', right: '5%', bottom: '5%', top: '5%' },
      xAxis: { type: 'category', data: years, splitArea: { show: true } },
      yAxis: { type: 'category', data: countries, splitArea: { show: true } },
      visualMap: { min: 85, max: 1850, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, inRange: { color: ['#e8edf4','#7ba3cc','#2c5f8a','#1a3a5c'] } },
      series: [{ type: 'heatmap', data: heatData, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.25)' } } }]
    });
  }

  // Handle resize
  window.addEventListener('resize', function() {
    var ids = ['chartVolume','chartIndex','chartTrade','chartNetwork','chartCargo','chartHeatmap'];
    ids.forEach(function(id) {
      var dom = document.getElementById(id);
      if (dom) {
        var inst = echarts.getInstanceByDom(dom);
        if (inst) inst.resize();
      }
    });
  });
}
