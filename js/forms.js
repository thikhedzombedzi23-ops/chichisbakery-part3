

var CONTACT_EMAIL = 'thikhedzombedzi23@gmail.com';
// Put a real form-handling URL here (e.g. Formspree) to send enquiries for real.
// While it is empty, submission is simulated so the AJAX flow can still be demonstrated.
var ENQUIRY_ENDPOINT = 'thikhedzombedzi23@gmail.com';

/* ---------- Validation rules ---------- */
var rules = {
  name: function (v) {
    if (!v) return 'Please enter your full name.';
    if (!/^[\p{L}][\p{L} '\u2019.\-]{1,59}$/u.test(v)) return 'Use letters only (2\u201360 characters).';
    return '';
  },
  email: function (v) {
    if (!v) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email, e.g. name@example.com.';
    return '';
  },
  phone: function (v) { 
    if (!v) return '';
    var cleaned = v.replace(/[\s-]/g, '');
    if (!/^(0|\+27)[1-9]\d{8}$/.test(cleaned)) return 'Enter a valid SA number, e.g. 0821234567.';
    return '';
  },
  select: function (v) {
    return v ? '' : 'Please choose an option.';
  },
  date: function (v) {
    if (!v) return '';
    var d = new Date(v + 'T00:00:00');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(d)) return 'Enter a valid date.';
    if (d < today) return 'The date cannot be in the past.';
    return '';
  },
  message: function (v) {
    if (!v) return 'Please type your message.';
    if (v.length < 10) return 'Please write at least 10 characters.';
    if (v.length > 1000) return 'Please keep it under 1000 characters.';
    return '';
  }
};

/* ---------- Helpers ---------- */
function getError(field) {
  var holder = field.parentNode.querySelector('.error[data-for="' + field.id + '"]');
  if (!holder) {
    holder = document.createElement('span');
    holder.className = 'error';
    holder.setAttribute('data-for', field.id);
    holder.id = field.id + '-error';
    field.setAttribute('aria-describedby', holder.id);
    field.insertAdjacentElement('afterend', holder);
  }
  return holder;
}

function checkField(field, ruleName) {
  var message = rules[ruleName](field.value.trim());
  getError(field).textContent = message;
  field.classList.toggle('invalid', message !== '');
  field.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');
  return message === '';
}

function setupForm(form, map, onValid) {
  form.setAttribute('novalidate', ''); 

  map.forEach(function (item) {
    var field = document.getElementById(item.id);
    field.addEventListener('blur', function () { checkField(field, item.rule); });
    field.addEventListener('input', function () {
      if (field.classList.contains('invalid')) checkField(field, item.rule);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    var allOk = true;
    map.forEach(function (item) {
      var field = document.getElementById(item.id);
      if (!checkField(field, item.rule)) {
        allOk = false;
        if (!firstBad) firstBad = field;
      }
    });
    if (!allOk) { firstBad.focus(); return; }
    onValid(form);
  });
}

function showMessage(box, html, type) {
  box.className = 'response-box ' + type;
  box.setAttribute('role', type === 'error' ? 'alert' : 'status');
  box.innerHTML = html;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* AJAX submission (fetch). Falls back to a simulated request if no endpoint is set. */
function submitAsync(data) {
  if (!ENQUIRY_ENDPOINT) {
    return new Promise(function (resolve) { setTimeout(resolve, 700); });
  }
  return fetch(ENQUIRY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (res) {
    if (!res.ok) throw new Error('Server responded with ' + res.status);
  });
}

/* ---------- Enquiry page ---------- */
function buildEnquiryResponse(data) {
  var lines = [];
  var firstName = data.name.split(' ')[0];

  if (data.type === 'cake') {
    lines.push('Our celebration cakes start from <strong>R320</strong> (Vanilla Bean) and <strong>R350</strong> (Chocolate Fudge). Final pricing depends on size and decoration.');
  } else if (data.type === 'catering') {
    lines.push('Catering and bulk orders are quoted per item. Please allow us to confirm quantities and we will send you a full quote.');
  } else if (data.type === 'wholesale') {
    lines.push('For wholesale bread supply our standard loaf prices are <strong>R55</strong> (Sourdough) and <strong>R60</strong> (Rye). Volume discounts are available.');
  } else {
    lines.push('Thank you for your enquiry. A member of our team will respond with the details you need.');
  }

  if (data.date) {
    var d = new Date(data.date + 'T00:00:00');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var daysAway = Math.round((d - today) / 86400000);
    var pretty = d.toDateString();

    if (d.getDay() === 1) {
      lines.push('<strong>Availability:</strong> we are closed on Mondays, so ' + pretty + ' is not possible. Please choose Tuesday to Sunday.');
    } else if ((data.type === 'cake' || data.type === 'catering') && daysAway < 3) {
      lines.push('<strong>Availability:</strong> ' + pretty + ' is short notice. We usually need at least 3 days, but we will try to help, so please call us on 015 345 6789.');
    } else {
      lines.push('<strong>Availability:</strong> ' + pretty + ' looks good. We will confirm it when we send your quote.');
    }
  }

  lines.push('We will reply to <strong>' + escapeHtml(data.email) + '</strong> within 1 working day.');
  return '<p>Thank you, ' + escapeHtml(firstName) + '!</p><p>' + lines.join('</p><p>') + '</p>';
}

function initEnquiryForm() {
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var box = document.getElementById('enquiry-response');

  setupForm(form, [
    { id: 'full-name', rule: 'name' },
    { id: 'email', rule: 'email' },
    { id: 'phone', rule: 'phone' },
    { id: 'enquiry-type', rule: 'select' },
    { id: 'event-date', rule: 'date' },
    { id: 'message', rule: 'message' }
  ], function () {
    var data = {
      name: document.getElementById('full-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      type: document.getElementById('enquiry-type').value,
      date: document.getElementById('event-date').value,
      message: document.getElementById('message').value.trim()
    };
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending...';
    showMessage(box, '<p>Sending your enquiry...</p>', 'info');

    submitAsync(data).then(function () {
      showMessage(box, buildEnquiryResponse(data), 'success');
      form.reset();
    }).catch(function () {
      showMessage(box, '<p>Sorry, something went wrong. Please try again or call us on 015 345 6789.</p>', 'error');
    }).then(function () {
      button.disabled = false;
      button.textContent = 'Submit Enquiry';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

/* ---------- Contact page ---------- */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var box = document.getElementById('contact-response');

  setupForm(form, [
    { id: 'c-full-name', rule: 'name' },
    { id: 'c-email', rule: 'email' },
    { id: 'c-message-type', rule: 'select' },
    { id: 'c-message', rule: 'message' }
  ], function () {
    var name = document.getElementById('c-full-name').value.trim();
    var email = document.getElementById('c-email').value.trim();
    var typeSelect = document.getElementById('c-message-type');
    var typeLabel = typeSelect.options[typeSelect.selectedIndex].text;
    var message = document.getElementById('c-message').value.trim();

    var subject = typeLabel + ' from ' + name;
    var body = 'Name: ' + name + '\r\n' +
               'Email: ' + email + '\r\n' +
               'Message type: ' + typeLabel + '\r\n\r\n' +
               message;
    var mailto = 'mailto:' + CONTACT_EMAIL +
                 '?subject=' + encodeURIComponent(subject) +
                 '&body=' + encodeURIComponent(body);

    showMessage(box,
      '<p>Thanks, ' + escapeHtml(name.split(' ')[0]) + '! Your email to <strong>' + CONTACT_EMAIL +
      '</strong> is ready.</p>' +
      '<p><a class="cta-button" href="' + mailto + '">Open email and send</a></p>' +
      '<p>If your email app did not open, click the button above.</p>', 'success');
    window.location.href = mailto;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initEnquiryForm();
  initContactForm();
});
