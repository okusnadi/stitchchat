xcodeproj './iOS/stitchchat.xcodeproj'

source 'https://github.com/CocoaPods/Specs.git'
pod 'React', :subspecs => ['Core', 'RCTImage', 'RCTNetwork', 'RCTText', 'RCTWebSocket'], :path => 'node_modules/react-native'
pod 'Fabric'
pod 'Crashlytics'
pod 'Digits'
pod 'TwitterCore'

post_install do |installer|
  target = installer.pods_project.targets.select{|t| 'React' == t.name}.first
  phase = target.new_shell_script_build_phase('Run Script')
  phase.shell_script = "if nc -w 5 -z localhost 8081 ; then\n  if ! curl -s \"http://localhost:8081/status\" | grep -q \"packager-status:running\" ; then\n    echo \"Port 8081 already in use, packager is either not running or not running correctly\"\n    exit 2\n  fi\nelse\n  open $SRCROOT/../node_modules/react-native/packager/launchPackager.command || echo \"Can't start packager automatically\"\nfi"
end