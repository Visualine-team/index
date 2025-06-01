console.log('Welcome to Visualine!');

function toggleMenu() {
    var nav = document.getElementById('main-nav');
    nav.classList.toggle('open');
}

// --- Editable Data Section ---

// Project data
const projectData = {
    website: {
        name: 'website',
        desc: 'A smart task management app for teams and individuals. Organize, track, and collaborate on tasks with ease.',
        img: '', // Placeholder for image URL
        author: 'Yahya',
        details: '<ul><li>Real-time collaboration</li><li>Customizable workflows</li><li>Notifications & reminders</li></ul>'
    },
    taskflow: {
        name: 'TaskFlow',
        desc: 'A smart task management app for teams and individuals. Organize, track, and collaborate on tasks with ease.',
        img: '', // Placeholder for image URL
        author: 'Samy',
        details: '<ul><li>Real-time collaboration</li><li>Customizable workflows</li><li>Notifications & reminders</li></ul>'
    },
    quicknote: {
        name: 'QuickNote',
        desc: 'Fast, simple note-taking for busy professionals. Capture ideas instantly and access them anywhere.',
        img: '', // Placeholder for image URL
        author: 'Samy',
        details: '<ul><li>Rich text editing</li><li>Cloud sync</li><li>Tagging & search</li></ul>'
    },
    blog: {
        name: 'blog',
        desc: 'Fast, simple note-taking for busy professionals. Capture ideas instantly and access them anywhere.',
        img: '', // Placeholder for image URL
        author: 'Fatima',
        details: '<ul><li>Rich text editing</li><li>Cloud sync</li><li>Tagging & search</li></ul>'
    }
};

// Service data
const serviceData = {
    webdev: {
        name: 'Web Development',
        desc: 'Modern, responsive websites and web apps.',
        details: '<ul><li>Custom website design</li><li>Progressive web apps</li><li>SEO optimization</li></ul>'
    },
    automation: {
        name: 'Automation',
        desc: 'Automate your workflow and save time.',
        details: '<ul><li>Task automation</li><li>Integration with third-party tools</li><li>Custom scripts</li></ul>'
    }
};

// Team data
const teamData = {
    yahya: {
        name: 'Yahya',
        role: 'Full Stack Developer',
        // bio: 'Yahya specializes in full stack development, project management, and innovative solutions.'
        bio: `I am a developer who can make Android applications that support database functionality and run on Mobile. I have more than two years of experience in that field and I can deliver high-quality work on time and within budget. Some of the skills that I have are:
            <br>
            <br>
            - Programming languages: HTML,CSS,javascript,php and SQL.<br>
            - I can use laravel framework<br>
            - Database management systems: SQLite, MySQL.<br>
            - Tools and platforms: Visual Studio Code, NetBeans.<br>
            - 2-year experience as a problem solver.<br>
            - open to feedback and suggestions.<br>
            `
    },
    samy: {
        name: 'Samy',
        role: 'Frontend Developer',
        bio: 'Samy crafts beautiful and responsive user interfaces, ensuring a seamless user experience for all Visualine projects.'
    },
    fatima: {
        name: 'Fatima',
        role: 'Backend Developer',
        bio: 'Fatima builds robust backend systems and APIs, making sure everything runs smoothly and securely.'
    }
};

// --- End Editable Data Section ---

function showProject(key) {
    const win = document.getElementById('project-details-window');
    const content = document.getElementById('project-details-content');
    const data = projectData[key];
    if (data) {
        // Find the author key by matching name (case-insensitive)
        let authorKey = null;
        if (data.author) {
            authorKey = Object.keys(teamData).find(k => teamData[k].name.toLowerCase() === data.author.toLowerCase());
        }
        const authorHtml = authorKey
            ? `<a href="#" class="project-author-link" onclick="showMemberProfile('${authorKey}');return false;"><strong style='color:#fff;'>${data.author}</strong></a>`
            : `<strong style='color:#fff;'>${data.author}</strong>`;
        content.innerHTML = `
            <div class='project-img-placeholder' style='margin-bottom:1rem;'>Img</div>
            <h3>${data.name}</h3>
            <p><strong>Author:</strong> ${authorHtml}</p>
            <p>${data.desc}</p>
            ${data.details}
        `;
        win.classList.add('active');
        win.style.display = 'flex';
    }
}

function closeProjectWindow() {
    const win = document.getElementById('project-details-window');
    win.classList.remove('active');
    win.style.display = 'none';
}

function showService(key) {
    const win = document.getElementById('service-details-window');
    const content = document.getElementById('service-details-content');
    const data = serviceData[key];
    if (data) {
        content.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.desc}</p>
            ${data.details}
        `;
        win.classList.add('active');
        win.style.display = 'flex';
    }
}

function closeServiceWindow() {
    const win = document.getElementById('service-details-window');
    win.classList.remove('active');
    win.style.display = 'none';
}

function showMemberProfile(memberKey) {
    closeProjectWindow();
    // Remove all sections except header and footer
    document.querySelectorAll('section, .container').forEach(el => {
        if (!el.closest('header') && !el.closest('footer')) el.remove();
    });
    // Remove any existing member-profile section
    const oldProfile = document.getElementById('member-profile');
    if (oldProfile) oldProfile.remove();
    // Add member profile section before footer
    const member = teamData[memberKey];
    if (member) {
        // Find projects authored by this member
        const myProjects = Object.values(projectData).filter(p => p.author && p.author.toLowerCase() === member.name.toLowerCase());
        let myProjectsHtml = '';
        if (myProjects.length > 0) {
            myProjectsHtml = `<section class='my-projects'><h3>My Projects</h3><div class='project-list'>` +
                myProjects.map(p => {
                    // Find the project key by name (case-insensitive)
                    const key = Object.keys(projectData).find(k => projectData[k].name.toLowerCase() === p.name.toLowerCase());
                    return `<div class='project-item' tabindex='0' onclick="showProject('${key}')"><div class='project-img-placeholder'>Img</div><h3>${p.name}</h3><p>${p.desc}</p></div>`;
                }).join('') +
                `</div></section>`;
        }
        let hireMeHtml = `<section id="hire-me" class='hire-me'>
            <div class="hire-me-proposal-card">
                <div style="width: 100%;display: flex;gap: 10px;">
                    <div class="logo-placeholder">${member.name[0]}</div>
                    <div style="flex:1;">
                        <div style="font-weight:600;font-size:1.1em;color:#fff;">${member.name}</div>
                        <div style="font-size:0.98em;color:var(--primary);">${member.role}</div>
                    </div>
                </div>
                <form class="hire-me-form">
                    <div class="hire-fields">
                        <div style="flex:1;">
                            <label for="hire-price">Suggested Price</label>
                            <div style="position:relative;">
                                <span style="position:absolute;left:0.9em;top:50%;transform:translateY(-50%);color:#aaa;font-size:1.1em;pointer-events:none;">$</span>
                                <input id="hire-price" type="number" name="price" min="0" step="1" placeholder="e.g. 100" style="padding-left:2em;appearance:textfield;" />
                            </div>
                        </div>
                        <div style="flex:1;">
                            <label for="hire-email">Your Email</label>
                            <input id="hire-email" type="email" name="email" placeholder="for reply" required />
                        </div>
                        <div style="flex:1;">
                            <label for="hire-deadline">Deadline (days)</label>
                            <input id="hire-deadline" type="number" name="deadline" min="1" step="1" placeholder="e.g. 7" />
                        </div>
                    </div>
                    <div style="width:100%;">
                        <label for="hire-message">Proposal / Message</label>
                        <textarea id="hire-message" name="message" rows="4" placeholder="Describe your project or message for ${member.name}..."></textarea>
                    </div>
                    <button type="submit" class="hire-me-btn">Send Proposal</button>
                </form>
            </div>
        </section>`;
        const section = document.createElement('section');
        section.className = 'member-profile';
        section.id = 'member-profile';
        section.innerHTML = `
                <div style="display:flex;align-items:center;gap:1rem;justify-content:start;">
                    <div class="logo-placeholder" style="margin:0;width:48px;height:48px;font-size:1.3rem;">${member.name[0]}</div>
                    <div>
                        <h2 style="margin:0 0 0.3rem 0;">${member.name}</h2>
                        <h4 style="margin:0 0 0.7rem 0;color:var(--primary);">${member.role}</h4>
                    </div>
                    <a href="#hire-me" class="hire-me-btn">Hire Me</a>
                </div>
                <p style="margin-top:1.5rem;">${member.bio}</p>
                ${myProjectsHtml}
                ${hireMeHtml}
        `;
        document.body.insertBefore(section, document.querySelector('footer'));
    }
}

function restoreMainSections() {
    // Remove member profile if present
    const oldProfile = document.getElementById('member-profile');
    if (oldProfile) oldProfile.remove();
    const footer = document.querySelector('footer');
    // Landing
    if (!document.getElementById('landing')) {
        const landing = document.createElement('section');
        landing.className = 'landing';
        landing.id = 'landing';
        landing.innerHTML = `<div class="container"><h1>Welcome to Visualine</h1><p>We are the e-tasks team,we are building digital solutions that you demand.<br><strong>The Future is our vision</strong></p></div>`;
        document.body.insertBefore(landing, footer);
    }
    // Services
    if (!document.getElementById('services')) {
        const services = document.createElement('section');
        services.className = 'services';
        services.id = 'services';
        services.innerHTML = `<h2>Our Services</h2><div class="service-list">` +
            Object.keys(serviceData).map(key => {
                const s = serviceData[key];
                return `<div class="service-item" onclick="showService('${key}')" tabindex="0"><h4>${s.name}</h4><p>${s.desc}</p></div>`;
            }).join('') +
            `</div>`;
        document.body.insertBefore(services, footer);
    }
    // Service details window
    if (!document.getElementById('service-details-window')) {
        const serviceWin = document.createElement('div');
        serviceWin.id = 'service-details-window';
        serviceWin.className = 'project-details-window';
        serviceWin.style.display = 'none';
        serviceWin.innerHTML = `<div class="project-details-content"><span class="close" onclick="closeServiceWindow()">&times;</span><div id="service-details-content"></div></div>`;
        document.body.insertBefore(serviceWin, footer);
    }
    // Projects
    if (!document.getElementById('projects')) {
        const projects = document.createElement('section');
        projects.className = 'projects';
        projects.id = 'projects';
        projects.innerHTML = `<h2>Our Projects</h2><div class="project-list">` +
            Object.keys(projectData).map(key => {
                const p = projectData[key];
                const imgHtml = p.img ? `<img src="${p.img}" alt="${p.name}" class="project-img-placeholder"/>` : `<div class="project-img-placeholder">img</div>`;
                console.log(p.img);
                return `<div class="project-item" onclick="showProject('${key}')" tabindex="0">${imgHtml}<h3>${p.name}</h3><p>${p.desc}</p></div>`;
            }).join('') +
            `</div>`;
        document.body.insertBefore(projects, footer);
    }
    // Project details window
    if (!document.getElementById('project-details-window')) {
        const projectWin = document.createElement('div');
        projectWin.id = 'project-details-window';
        projectWin.className = 'project-details-window';
        projectWin.style.display = 'none';
        projectWin.innerHTML = `<div class="project-details-content"><span class="close" onclick="closeProjectWindow()">&times;</span><div id="project-details-content"></div></div>`;
        document.body.insertBefore(projectWin, footer);
    }
    // Team
    if (!document.getElementById('team')) {
        const team = document.createElement('section');
        team.className = 'team';
        team.id = 'team';
        team.innerHTML = `<h2>Team Members</h2><div class="team-list">` +
            Object.keys(teamData).map(key => {
                const m = teamData[key];
                return `<div class="team-member" onclick="showMemberProfile('${key}')"><h4>${m.name}</h4><p>${m.role}</p></div>`;
            }).join('') +
            `</div>`;
        document.body.insertBefore(team, footer);
    }
}

// Close modals on Escape or click outside
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectWindow();
        closeServiceWindow();
    }
});
window.addEventListener('mousedown', function(e) {
    const projectWin = document.getElementById('project-details-window');
    const serviceWin = document.getElementById('service-details-window');
    if (projectWin && projectWin.classList.contains('active') && e.target === projectWin) {
        closeProjectWindow();
    }
    if (serviceWin && serviceWin.classList.contains('active') && e.target === serviceWin) {
        closeServiceWindow();
    }
});

// Render navigation and sections dynamically
window.addEventListener('DOMContentLoaded', function() {
    // Render navigation dynamically
    const nav = document.getElementById('main-nav');
    if (nav) {
        nav.innerHTML = `
            <a href="#landing">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#team">Team</a>
        `;
    }

    // Render landing section
    const landing = document.getElementById('landing');
    if (landing) {
        landing.innerHTML = `<div class="container"><h1>Welcome to Visualine</h1><p>We are the e-tasks team,we are building digital solutions that you demand.<br><strong>The Future is our vision</strong></p></div>`;
    }

    // Render services section
    const services = document.getElementById('services');
    if (services) {
        services.innerHTML = `<h2>Our Services</h2><div class="service-list">` +
            Object.keys(serviceData).map(key => {
                const s = serviceData[key];
                return `<div class="service-item" onclick="showService('${key}')" tabindex="0"><h4>${s.name}</h4><p>${s.desc}</p></div>`;
            }).join('') +
            `</div>`;
    }

    // Render projects section
    const projects = document.getElementById('projects');
    if (projects) {
        projects.innerHTML = `<h2>Our Projects</h2><div class="project-list">` +
            Object.keys(projectData).map(key => {
                const p = projectData[key];
                return `<div class="project-item" onclick="showProject('${key}')" tabindex="0"><div class="project-img-placeholder">Img</div><h3>${p.name}</h3><p>${p.desc}</p></div>`;
            }).join('') +
            `</div>`;
    }

    // Render team section
    const team = document.getElementById('team');
    if (team) {
        team.innerHTML = `<h2>Team Members</h2><div class="team-list">` +
            Object.keys(teamData).map(key => {
                const m = teamData[key];
                return `<div class="team-member" onclick="showMemberProfile('${key}')"><h4>${m.name}</h4><p>${m.role}</p></div>`;
            }).join('') +
            `</div>`;
    }

    // Attach nav click handlers to clear and restore sections
    document.querySelectorAll('#main-nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('section, .container').forEach(el => {
                if (!el.closest('header') && !el.closest('footer')) el.remove();
            });
            const oldProfile = document.getElementById('member-profile');
            if (oldProfile) oldProfile.remove();
            restoreMainSections();
        });
    });
});

// --- End dynamic member profile and section logic ---
