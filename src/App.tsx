import {
    Blockquote,
    Button,
    Group,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { useStore } from "./store/store";
import * as alt1 from "alt1";
import { useEffect, useState } from "react";
import { getImageDataFromUrl } from "./util/alt1Util";

function App() {
    const store = useStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const image = alt1.captureHoldFullRs();
    useEffect(() => {
        getImageDataFromUrl("/homebutton.data.png").then((imageData) => {
            if (imageData) {
                const position = image.findSubimage(imageData);
                if (position[0]) {
                    setPosition(position[0]);
                }
            }
        });
    }, []);
    return (
        <main style={{ height: "100%" }}>
            <Group>
                <TextInput disabled label="X Coordinate" value={position.x} />
                <TextInput disabled label="Y Coordinate" value={position.y} />
            </Group>
            <img
                src={`data:image/png;base64,${image.toData().toPngBase64()}`}
                width={"100%"}
            />
            <Stack>
                <Text>{store.example.counter}</Text>
                <Group>
                    <Button onClick={() => store.example.increase(1)}>
                        Increase
                    </Button>
                    <Button onClick={() => store.example.increase(-1)}>
                        Decrease
                    </Button>
                </Group>
            </Stack>
            <Stack>
                <Blockquote cite={`-- ${store.example.msg.author}`}>
                    {store.example.msg.quote}
                </Blockquote>

                <Button onClick={() => store.example.getMsg()}>
                    Get Message
                </Button>
            </Stack>
            <Stack>
                <Text>{store.other.counter}</Text>
                <Group>
                    <Button onClick={() => store.other.increase(1)}>
                        Increase
                    </Button>
                    <Button onClick={() => store.other.increase(-1)}>
                        Decrease
                    </Button>
                </Group>
            </Stack>
            <Stack>
                <Text>{store.other.msg}</Text>

                <Button onClick={() => store.other.newMsg()}>
                    New Message
                </Button>
            </Stack>
        </main>
    );
}

export default App;
