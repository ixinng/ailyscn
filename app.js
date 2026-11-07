(() => {
  const CONTACT_EMAIL = 'obbro@foxmail.com';
  const DOMAIN_DATA = {
    '1024.link': { brand: '千链', brandEn: 'QianChain', tagline: '把开发者都记得的数字，放在链接的后缀上', positioning: '1024 是程序员共同记住的日期，.link 直指链接与连接关系，适合开发者工具、短链服务与社区入口。', scenarios: ['开发者工具', '短链服务', '社区入口'] },
    '1024.store': { brand: '千店', brandEn: 'QianStore', tagline: '同一个数字，换到店铺的后缀上', positioning: '1024 的开发者符号叠加 .store 的交易语义，适合开店工具、独立站与商品集合站，也能与 1024.link 组成同一套品牌记忆。', scenarios: ['开店工具', '独立站', '商品集合站'] },
    'suisuinian.top': { brand: '岁岁念', brandEn: 'SuiSuiNian', tagline: '把「碎碎念」写成「岁岁念」', positioning: '谐音好记，同时带着记录与长久的意思，适合个人内容、纪念日产品与生活方式品牌，名字本身就有温度。', scenarios: ['个人内容', '纪念日产品', '生活方式品牌'] },
    'oldboy.top': { brand: '老男孩', brandEn: 'OldBoy', tagline: '一个不需要翻译的名字', positioning: '直白的英文词组，指代经历过一段路仍愿意出发的人，适合男性成长社群、户外运动与复古生活方式品牌。', scenarios: ['男性成长社群', '户外运动', '复古生活方式'] },
    'ailys.cn': { brand: '艾莉诗', brandEn: 'Ailys', tagline: '五个字母，直接长成一个品牌名', positioning: '读音自然接近「艾莉诗」，.cn 后缀适合面向国内用户的品牌站、内容号与本地服务，短字母便于口头传播。', scenarios: ['品牌站', '内容号', '本地服务'] },
  };

  // Navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  window.closeNav = () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  };

  // Inquiry via mailto
  window.openInquiry = (domain) => {
    const data = DOMAIN_DATA[domain];
    const subject = `域名询价 - ${domain} (${data.brand})`;
    const body = `您好！我对以下域名感兴趣：\n\n域名：${domain}\n品牌：${data.brand}（${data.brandEn}）\n\n我的称呼：\n联系邮箱：\n联系电话（选填）：\n意向出价/预算区间：\n其他说明：\n\n期待回复，谢谢！`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Form submission
  window.submitInquiry = () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const domain = document.getElementById('fdomain').value;
    const budget = document.getElementById('fbudget').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name) { showToast('请填写称呼'); return; }
    if (!email || !email.includes('@')) { showToast('请填写有效的邮箱地址'); return; }

    const data = domain ? DOMAIN_DATA[domain] : null;
    const subject = `域名询价 - ${name}${domain ? ' - ' + domain : ''}`;
    let body = `您好！我对以下域名感兴趣：\n\n`;
    if (data) {
      body += `域名：${domain}\n品牌：${data.brand}（${data.brandEn}）\n`;
    }
    body += `\n我的称呼：${name}\n联系邮箱：${email}`;
    if (phone) body += `\n联系电话：${phone}`;
    if (budget) body += `\n意向出价/预算区间：${budget}`;
    if (message) body += `\n其他说明：${message}`;
    body += `\n\n期待回复，谢谢！`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('正在打开邮件客户端...');
  };

  // Copy email template
  window.copyEmailTemplate = async () => {
    const template = document.getElementById('emailTemplate').textContent;
    try {
      await navigator.clipboard.writeText(template);
      showToast('已复制到剪贴板');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = template;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('已复制到剪贴板');
    }
  };

  // Toast notification
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
