import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MyApp());
}

class AudioOutputWidget extends StatefulWidget {
  @override
  _AudioOutputWidgetState createState() => _AudioOutputWidgetState();
}

class _AudioOutputWidgetState extends State<AudioOutputWidget> {
  late AudioHelper audioHelper;
  bool isSpeakerAvailable = false;
  bool isBluetoothHeadsetConnected = false;

  @override
  void initState() {
    super.initState();
    audioHelper = AudioHelper();
    updateAudioOutputs();
  }

  void updateAudioOutputs() {
    setState(() {
      isSpeakerAvailable = audioHelper.audioOutputAvailable(AudioDeviceInfo.TYPE_BUILTIN_SPEAKER);
      isBluetoothHeadsetConnected = audioHelper.audioOutputAvailable(AudioDeviceInfo.TYPE_BLUETOOTH_A2DP);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          ElevatedButton(
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: Text('Audio Output Availability'),
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Speaker Available: $isSpeakerAvailable'),
                        Text('Bluetooth Headset Connected: $isBluetoothHeadsetConnected'),
                      ],
                    ),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: Text('Close'),
                      ),
                    ],
                  );
                },
              );
            },
            child: Text('Check Audio Output'),
          ),
          ElevatedButton(
            onPressed: () {
              openBluetoothSettings();
            },
            child: Text('Open Bluetooth Settings'),
          ),
          ElevatedButton(
            onPressed: () {
              
            },
            child: Text('Play Audio'),
          ),
        ],
      ),
    );
  }

  void openBluetoothSettings() {
    Intent intent = Intent();
    intent.setAction("android.settings.BLUETOOTH_SETTINGS");
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
    intent.putExtra("EXTRA_CONNECTION_ONLY", true);
    intent.putExtra("EXTRA_CLOSE_ON_CONNECT", true);
    intent.putExtra("android.bluetooth.devicepicker.extra.FILTER_TYPE", 1);
    // Use 'context' to start activity
    // StartActivity(intent); 
  }
}

class AudioHelper {
  bool audioOutputAvailable(int type) {
    
    return true;
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Audio Output Checker'),
        ),
        body: AudioOutputWidget(),
      ),
    );
  }
}
