<script lang="ts">
    import { FFmpeg, type FileData } from "@ffmpeg/ffmpeg";
    import { onMount } from "svelte";

    let ffmpeg: FFmpeg;
    let ready = $state(false);
    let video: FileData = $state("");
    let gif = $state("");

    async function loadFFmpeg() {
        const baseURL =
            "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

        ffmpeg = new FFmpeg();

        await ffmpeg.load({
            coreURL: `${baseURL}/ffmpeg-core.js`,
            wasmURL: `${baseURL}/ffmpeg-core.wasm`,
        });

        ready = true;
    }

    async function readFile(file: File): Promise<Uint8Array> {
        return new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                const { result } = fileReader;
                if (result instanceof ArrayBuffer) {
                    resolve(new Uint8Array(result));
                }
            };

            fileReader.readAsArrayBuffer(file);
        });
    }

    async function convToGif() {
        console.log("A");
        const videoAsUintArr = await readFile(video);
        await ffmpeg.writeFile("temp.mp4", videoAsUintArr);
        await ffmpeg.exec([
            "-i",
            "temp.mp4",
            "-t",
            "2.5",
            "-ss",
            "2.0",
            "-f",
            "gif",
            "out.gif",
        ]);
        const data = await ffmpeg.readFile("out.gif");
        const url = URL.createObjectURL(
            new Blob([data.buffer], { type: "imaage/gif" }),
        );
        gif = url;
    }

    onMount(() => loadFFmpeg());
</script>

{#if ready}
    {#if video}
        <video controls width="250" src={URL.createObjectURL(video)}></video>
    {/if}
    <input
        type="file"
        onchange={(e) => {
            video = e.target?.files?.item(0);
        }}
    />
    <button onclick={convToGif}>Convert</button>
    {#if gif}
        <img src={gif} alt="generated gif" />
    {/if}
{:else}
    <p>Loading...</p>
{/if}
