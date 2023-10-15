import axios from "axios";


export const githubAPI = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization:'Bearer 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'
    }
});