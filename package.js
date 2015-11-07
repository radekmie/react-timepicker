Package.describe({
    name: 'universe:react-timepicker',
    version: '1.1.1',
    documentation: 'README.md',
    summary: 'React timepicker in Android KitKat style',
    git: 'git@github.com:radekmie/react-timepicker.git'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');

    api.use('react-runtime@0.14.1_1');
    api.use('universe:modules@0.6.1', { weak: true });

    api.addFiles('timepicker.js');
    api.addFiles('timepicker.css', 'client');

    api.export('_Timepicker');
});
