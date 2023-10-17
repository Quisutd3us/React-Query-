import axios from "axios";


export const githubAPI = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization:'Bearer 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'
    }
});